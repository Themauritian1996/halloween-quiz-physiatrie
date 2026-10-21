// Test automatisé du mapping état local <-> document Firestore (Lot 2).
// Aucun projet Firebase requis : on teste la couche pure lib/roomMapping.js,
// exactement celle qu'utilise lib/room.js avant chaque setDoc / après chaque
// getDoc-onSnapshot. Lancer : npm test  (node --test)
// Le vrai aller-retour RÉSEAU vers Firestore, lui, n'est PAS testé ici
// (aucun projet Firebase réel dans cet environnement) — voir README.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ROOMS_COLLECTION,
  firestoreToRoom,
  isValidRoomDoc,
  roomToFirestore,
} from '../src/lib/roomMapping.js'

function sampleRoom() {
  return {
    code: 'ABC234',
    config: { numQuestions: 30, mode: 'solo', timerSec: 45, teams: [] },
    status: 'question',
    teams: [],
    players: [
      { id: 'p1', name: 'Test', teamId: null, score: 500, streak: 2, isCaptain: false, isBot: false, powers: { double: false, skip: false, fifty: false, curse: false } },
    ],
    questionIds: ['histoire-0001', 'histoire-0002'],
    currentIndex: 0,
    questionStartedAt: 1729000000000,
    answers: { p1: { choice: 1, elapsedMs: 3200 } },
    round: { doubleBy: ['p1'], fiftyBy: {}, cursedBy: null },
    lastDetail: {},
    scoredIndex: -1,
    _v: 3,
    _updatedAt: 1729000001000,
  }
}

test('collection cible = rooms/{code}', () => {
  assert.equal(ROOMS_COLLECTION, 'rooms')
})

test('aller-retour local -> Firestore -> local préserve l’état', () => {
  const room = sampleRoom()
  const docData = roomToFirestore(room)
  const back = firestoreToRoom(docData)
  assert.deepEqual(back, room)
})

test('le document produit est du JSON pur (aucun undefined, sérialisable)', () => {
  const room = { ...sampleRoom(), questionStartedAt: undefined, extra: undefined }
  room.round = { ...room.round, ghost: undefined }
  const docData = roomToFirestore(room)
  assert.equal('questionStartedAt' in docData, false)
  assert.equal('extra' in docData, false)
  assert.equal('ghost' in docData.round, false)
  assert.deepEqual(JSON.parse(JSON.stringify(docData)), docData)
})

test('isValidRoomDoc accepte une vraie partie et rejette les formes invalides', () => {
  assert.equal(isValidRoomDoc(roomToFirestore(sampleRoom())), true)
  assert.equal(isValidRoomDoc(null), false)
  assert.equal(isValidRoomDoc({ ...sampleRoom(), code: 'abc' }), false)
  assert.equal(isValidRoomDoc({ ...sampleRoom(), status: 'hacked' }), false)
  assert.equal(isValidRoomDoc({ ...sampleRoom(), players: 'tous' }), false)
})

test('firestoreToRoom applique les défauts sur un document partiel/ancien', () => {
  const partial = firestoreToRoom({ code: 'ZZZ999', config: { mode: 'solo' }, status: 'lobby' })
  assert.deepEqual(partial.players, [])
  assert.deepEqual(partial.teams, [])
  assert.deepEqual(partial.questionIds, [])
  assert.deepEqual(partial.answers, {})
  assert.deepEqual(partial.round, { doubleBy: [], fiftyBy: {}, cursedBy: null })
  assert.equal(partial.currentIndex, -1)
  assert.equal(firestoreToRoom(null), null)
  assert.equal(firestoreToRoom('pas un objet'), null)
})

test('roomToFirestore rejette une partie sans code', () => {
  assert.throws(() => roomToFirestore({ status: 'lobby' }), /code manquant/)
  assert.throws(() => roomToFirestore(null), /code manquant/)
})
