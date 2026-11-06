// Store de partie — DEUX BACKENDS derrière la même interface asynchrone :
//   loadRoom(code) -> Promise<room|null>
//   saveRoom(room) -> Promise<room>
//   subscribeRoom(code, cb) -> unsubscribe()
//
// 1) FIRESTORE (si les VITE_FIREBASE_* sont présents dans .env, voir firebase.js) :
//    document unique `rooms/{code}` écouté en temps réel via onSnapshot.
//    Hôte et joueurs sont alors sur des APPAREILS DIFFÉRENTS (téléphones via
//    lien/code). Mapping état <-> document : lib/roomMapping.js.
//    NB concurrence : le modèle est « document entier, dernier save gagne » ;
//    l'hôte est l'autorité pour les transitions (lancement, révélation, scoring),
//    les joueurs n'écrivent que leur jonction, leurs réponses et leurs pouvoirs.
//
// 2) MODE DÉMO LOCAL (repli automatique sans config Firebase) :
//    localStorage (clé hq_room_<CODE>) + BroadcastChannel — synchronise les
//    onglets d'un même navigateur seulement.
//
// Aucun autre fichier ne dépend du backend choisi : tout passe par ces 3 fonctions.
import { doc, getDoc, onSnapshot, runTransaction, setDoc, updateDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase.js'
import { ROOMS_COLLECTION, firestoreToRoom, isValidRoomDoc, roomToFirestore } from './roomMapping.js'

export const roomBackend = isFirebaseConfigured ? 'firestore' : 'local'

const key = (code) => `hq_room_${code}`

export function genCode() {
  const abc = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let s = ''
  for (let i = 0; i < 6; i++) s += abc[Math.floor(Math.random() * abc.length)]
  return s
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

// ---------- Backend LOCAL ----------
function loadRoomLocal(code) {
  try {
    const raw = localStorage.getItem(key(code))
    return raw ? firestoreToRoom(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

function saveRoomLocal(next) {
  try {
    localStorage.setItem(key(next.code), JSON.stringify(next))
  } catch {
    /* quota plein : on continue via BroadcastChannel */
  }
  const bc = new BroadcastChannel(`hq_${next.code}`)
  bc.postMessage({ type: 'room', room: next })
  bc.close()
  return next
}

function subscribeRoomLocal(code, cb) {
  const bc = new BroadcastChannel(`hq_${code}`)
  bc.onmessage = (e) => {
    if (e.data?.type === 'room') cb(e.data.room)
  }
  const onStorage = (e) => {
    if (e.key === key(code) && e.newValue) {
      try { cb(firestoreToRoom(JSON.parse(e.newValue))) } catch { /* ignore */ }
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    bc.close()
    window.removeEventListener('storage', onStorage)
  }
}

// ---------- Backend FIRESTORE ----------
const roomDoc = (code) => doc(db, ROOMS_COLLECTION, code)

async function loadRoomFirestore(code) {
  const snap = await getDoc(roomDoc(code))
  return snap.exists() ? firestoreToRoom(snap.data()) : null
}

async function saveRoomFirestore(next) {
  const data = roomToFirestore(next)
  if (!isValidRoomDoc(data)) throw new Error('Document de partie invalide (voir roomMapping.isValidRoomDoc)')
  await setDoc(roomDoc(next.code), data)
  return next
}

function subscribeRoomFirestore(code, cb) {
  return onSnapshot(
    roomDoc(code),
    (snap) => { if (snap.exists()) cb(firestoreToRoom(snap.data())) },
    (err) => { console.error('[room/firestore] onSnapshot:', err) },
  )
}

// ---------- Interface commune (asynchrone) ----------
export async function loadRoom(code) {
  return isFirebaseConfigured ? loadRoomFirestore(code) : loadRoomLocal(code)
}

export async function saveRoom(room) {
  const next = { ...room, _v: (room._v || 0) + 1, _updatedAt: Date.now() }
  return isFirebaseConfigured ? saveRoomFirestore(next) : saveRoomLocal(next)
}

export function subscribeRoom(code, cb) {
  return isFirebaseConfigured ? subscribeRoomFirestore(code, cb) : subscribeRoomLocal(code, cb)
}

export function emptyRoom(code, config) {
  return {
    code,
    config,
    status: 'lobby', // lobby | question | reveal | finished
    teams: config.teams || [],
    players: [],
    questionIds: [],
    currentIndex: -1,
    questionStartedAt: null,
    revealStartedAt: null, // horodatage de la révélation (enchaînement auto, Lot 8)
    answers: {}, // playerId -> {choice, elapsedMs, skipped}
    round: { doubleBy: [], fiftyBy: {}, cursedBy: null }, // état des pouvoirs pour la question en cours
    lastCurseIndex: -999, // v3 : index de la dernière question maudite (délai entre malédictions)
    lastDetail: {}, // détail de scoring de la dernière révélation
    scoredIndex: -1,
    _v: 0,
  }
}

// ============================================================================
// v3 — ÉCRITURES SANS PERTE À 12 JOUEURS
// Le modèle « document entier, dernier save gagne » perdait des réponses quand
// plusieurs joueurs répondaient dans la même seconde (chacun réécrivait le
// document à partir de SA copie). Désormais :
//   - mutateRoom(code, mut) : lecture-modification-écriture ATOMIQUE
//     (transaction Firestore ; en local, relit l'état le plus frais) ;
//   - setAnswer(code, playerId, answer) : écrit UNIQUEMENT le champ
//     answers.<playerId> (updateDoc) — aucune collision entre joueurs.
// ============================================================================

export async function mutateRoom(code, mut) {
  if (!isFirebaseConfigured) {
    const cur = loadRoomLocal(code)
    if (!cur) return null
    const draft = JSON.parse(JSON.stringify(cur))
    if (mut(draft) === false) return cur
    const next = { ...draft, _v: (draft._v || 0) + 1, _updatedAt: Date.now() }
    return saveRoomLocal(next)
  }
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(roomDoc(code))
    if (!snap.exists()) return null
    const draft = JSON.parse(JSON.stringify(firestoreToRoom(snap.data())))
    if (mut(draft) === false) return firestoreToRoom(snap.data())
    const next = { ...draft, _v: (draft._v || 0) + 1, _updatedAt: Date.now() }
    const data = roomToFirestore(next)
    if (!isValidRoomDoc(data)) throw new Error('Document de partie invalide')
    tx.set(roomDoc(code), data)
    return next
  }, { maxAttempts: 12 })
}

export async function setAnswer(code, playerId, answer) {
  if (!isFirebaseConfigured) {
    return mutateRoom(code, (d) => {
      if (d.answers[playerId]) return false
      d.answers[playerId] = answer
    })
  }
  await updateDoc(roomDoc(code), { [`answers.${playerId}`]: answer, _updatedAt: Date.now() })
  return null
}
