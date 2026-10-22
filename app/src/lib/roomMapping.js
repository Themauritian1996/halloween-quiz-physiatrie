// Mapping PUR état de partie (local) <-> document Firestore `rooms/{code}`.
// Aucune dépendance Firebase ni navigateur ici : ce module est testable en Node
// (voir tests/room-mapping.test.mjs) et garantit que le document stocké est
// du JSON sérialisable, sans valeurs `undefined` (Firestore les rejette).

export const ROOMS_COLLECTION = 'rooms'

/** Retire récursivement les valeurs `undefined` et normalise en JSON pur. */
function stripUndefined(value) {
  if (Array.isArray(value)) return value.map(stripUndefined)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue
      out[k] = stripUndefined(v)
    }
    return out
  }
  return value
}

/** État de partie -> document Firestore (objet JSON pur, code = id du doc). */
export function roomToFirestore(room) {
  if (!room || typeof room.code !== 'string' || !room.code) {
    throw new Error('roomToFirestore: room.code manquant')
  }
  const docData = stripUndefined(JSON.parse(JSON.stringify(room)))
  // Champs internes purement locaux (jamais persistés à distance)
  delete docData._localOnly
  return docData
}

/** Défauts appliqués à tout document lu, pour tolérer les anciens documents. */
export function normalizeRoom(data) {
  if (!data || typeof data !== 'object') return null
  return {
    status: 'lobby',
    teams: [],
    players: [],
    questionIds: [],
    currentIndex: -1,
    questionStartedAt: null,
    revealStartedAt: null,
    answers: {},
    round: { doubleBy: [], fiftyBy: {}, cursedBy: null },
    lastDetail: {},
    scoredIndex: -1,
    _v: 0,
    ...data,
    // Les sous-objets critiques gardent leurs défauts même si le doc est partiel
    round: { doubleBy: [], fiftyBy: {}, cursedBy: null, ...(data.round || {}) },
    answers: data.answers || {},
    players: Array.isArray(data.players) ? data.players : [],
    teams: Array.isArray(data.teams) ? data.teams : [],
    questionIds: Array.isArray(data.questionIds) ? data.questionIds : [],
  }
}

/** Document Firestore -> état de partie local. */
export function firestoreToRoom(data) {
  return normalizeRoom(data)
}

/** Validation minimale avant écriture distante (reflétée dans firestore.rules). */
export function isValidRoomDoc(data) {
  return Boolean(
    data &&
      typeof data.code === 'string' &&
      /^[A-Z0-9]{6}$/.test(data.code) &&
      ['lobby', 'question', 'reveal', 'finished'].includes(data.status) &&
      Array.isArray(data.players) &&
      Array.isArray(data.questionIds) &&
      data.config && typeof data.config === 'object',
  )
}
