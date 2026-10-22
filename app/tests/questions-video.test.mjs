// Test du support VIDÉO dans la banque et les filtres (Lot 9).
// lib/questions.js importe les JSON via Vite (attributs d'import propres au
// bundler) : il n'est pas importable tel quel sous Node. Ce test charge donc
// les mêmes fichiers de données et vérifie le contrat que poolFor() applique :
//   - isPlayable(q)  : !q.media || q.media.status !== 'a-completer'
//   - filtre 'media' : q.type !== 'texte'   (la vidéo DOIT y être incluse)
//   - filtre 'sans-media' : q.type === 'texte' (la vidéo DOIT en être exclue)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data')
const bank = readdirSync(dataDir)
  .filter((f) => f.endsWith('.json'))
  .flatMap((f) => JSON.parse(readFileSync(join(dataDir, f), 'utf8')))

const isPlayable = (q) => !q.media || q.media.status !== 'a-completer'
const mediaOnly = (q) => q.type !== 'texte'
const noMedia = (q) => q.type === 'texte'

test('la banque contient des questions vidéo jouables', () => {
  const videos = bank.filter((q) => q.type === 'video')
  assert.ok(videos.length >= 10, `au moins 10 questions vidéo attendues, reçu ${videos.length}`)
  for (const q of videos) assert.ok(isPlayable(q), `${q.id} doit être jouable`)
})

test('chaque question média a type === media.kind, vidéo comprise', () => {
  for (const q of bank) {
    if (q.media && q.media.kind) {
      assert.equal(q.type, q.media.kind, `${q.id} : type ${q.type} ≠ kind ${q.media.kind}`)
      assert.ok(['image', 'audio', 'video'].includes(q.type), `${q.id} : type média inconnu ${q.type}`)
      assert.ok(q.media.src, `${q.id} : media.src manquant`)
    } else {
      assert.equal(q.type, 'texte', `${q.id} : sans média, le type doit être « texte »`)
    }
  }
})

test('le filtre « Médias seulement » inclut les vidéos, « Sans média » les exclut', () => {
  const videos = bank.filter((q) => q.type === 'video')
  for (const q of videos) {
    assert.ok(mediaOnly(q), `${q.id} doit passer le filtre media`)
    assert.ok(!noMedia(q), `${q.id} ne doit pas passer le filtre sans-media`)
  }
  const mediaPool = bank.filter((q) => isPlayable(q) && mediaOnly(q))
  assert.ok(mediaPool.some((q) => q.type === 'video'), 'le pool média doit contenir des vidéos')
})
