// Tests de scoring (SPEC_v2 §1) — repris du Lot 1, formalisés en suite
// automatisée. Lancer : npm test  (node --test)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { baseSpeedPoints, scoreCurrentQuestion } from '../src/lib/scoring.js'

const Q = { correctIndex: 2 }
function room(answers, roundExtra = {}) {
  return {
    config: { timerSec: 45, consensus: false },
    players: [{ id: 'p1', name: 'A', score: 100, streak: 2, teamId: null }],
    teams: [],
    answers,
    round: { doubleBy: [], fiftyBy: {}, cursedBy: null, ...roundExtra },
  }
}

test('base vitesse : instantané = 1000, à la limite = 500', () => {
  assert.equal(baseSpeedPoints(0, 45), 1000)
  assert.equal(baseSpeedPoints(45000, 45), 500)
})

test('normal : bonne réponse instantanée, série 2->3 = 1000 + 150 bonus série', () => {
  const { players, detail } = scoreCurrentQuestion(room({ p1: { choice: 2, elapsedMs: 0 } }), Q)
  assert.equal(detail.p1.delta, 1150)
  assert.equal(players[0].score, 1250)
  assert.equal(players[0].streak, 3)
})

test('maudit : bonne réponse = 50 % seulement, bonus série intact', () => {
  const { detail } = scoreCurrentQuestion(room({ p1: { choice: 2, elapsedMs: 0 } }, { cursedBy: 'p9' }), Q)
  assert.equal(detail.p1.delta, 500 + 150)
  assert.equal(detail.p1.cursed, true)
})

test('maudit : mauvaise réponse = -500, avec plancher du cumul à 0', () => {
  const { players, detail } = scoreCurrentQuestion(room({ p1: { choice: 0, elapsedMs: 100 } }, { cursedBy: 'p9' }), Q)
  assert.equal(players[0].score, 0) // 100 - 500 -> plancher 0
  assert.equal(detail.p1.delta, -100) // delta réel après plancher
})

test('maudit : absent = -500 (plancher 0) ; sauter = 0 et série conservée', () => {
  const absent = scoreCurrentQuestion(room({}, { cursedBy: 'p9' }), Q)
  assert.equal(absent.players[0].score, 0)
  const skipped = scoreCurrentQuestion(room({ p1: { skipped: true, elapsedMs: 10 } }, { cursedBy: 'p9' }), Q)
  assert.equal(skipped.detail.p1.delta, 0)
  assert.equal(skipped.players[0].streak, 2)
})
