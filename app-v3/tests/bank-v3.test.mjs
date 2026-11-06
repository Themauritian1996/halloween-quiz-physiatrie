// Contrat de la banque v3 : 6 catégories × 80, 24 médias et 8 clins d'œil
// physiatrie par catégorie, bonnes réponses 20/20/20/20, aucun doublon.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data')
const files = readdirSync(dataDir).filter((f) => f.endsWith('.json'))

test('6 catégories de 80 questions', () => {
  assert.equal(files.length, 6)
  for (const f of files) assert.equal(JSON.parse(readFileSync(join(dataDir, f), 'utf8')).length, 80, f)
})

test('30 % de médias, 10 % physiatrie, positions équilibrées', () => {
  for (const f of files) {
    const qs = JSON.parse(readFileSync(join(dataDir, f), 'utf8'))
    assert.equal(qs.filter((q) => q.type !== 'texte').length, 24, f)
    assert.equal(qs.filter((q) => q.physiatrie).length, 8, f)
    for (const pos of [0, 1, 2, 3]) assert.equal(qs.filter((q) => q.correctIndex === pos).length, 20, `${f} position ${pos}`)
    for (const q of qs) {
      assert.equal(q.choices.length, 4, q.id)
      if (q.type !== 'texte') assert.ok(q.media?.src, `${q.id} sans média`)
    }
  }
})

test('aucune question en double', () => {
  const all = files.flatMap((f) => JSON.parse(readFileSync(join(dataDir, f), 'utf8')))
  assert.equal(new Set(all.map((q) => q.question.toLowerCase())).size, all.length)
  assert.equal(new Set(all.map((q) => q.id)).size, all.length)
})
