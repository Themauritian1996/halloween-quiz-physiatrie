import histoire from '../data/histoire.json'
import cinema from '../data/cinema-series.json'
import litterature from '../data/litterature.json'
import science from '../data/science-medecine.json'
import musique from '../data/musique-pop.json'
import traditions from '../data/traditions.json'

export const CATEGORIES = [
  { id: 'histoire', label: 'Histoire & origines', icon: '🕯️', data: histoire },
  { id: 'cinema-series', label: 'Cinéma & séries', icon: '🎬', data: cinema },
  { id: 'litterature', label: 'Littérature, légendes & monstres', icon: '📖', data: litterature },
  { id: 'science-medecine', label: 'Science, anatomie & médecine macabre', icon: '🦴', data: science },
  { id: 'musique-pop', label: 'Musique & pop culture', icon: '🎵', data: musique },
  { id: 'traditions', label: 'Traditions, bonbons & géographie', icon: '🍬', data: traditions },
]

export const ALL_QUESTIONS = CATEGORIES.flatMap((c) => c.data)
export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id

// Une question est jouable si son média est prêt (pas « a-completer »)
export const isPlayable = (q) => !q.media || q.media.status !== 'a-completer'

function shuffle(arr, rng = Math.random) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function poolFor(config) {
  let pool = ALL_QUESTIONS.filter(isPlayable)
  if (config.difficulty === 'intermediaire') pool = pool.filter((q) => q.difficulty === 'intermediaire')
  if (config.difficulty === 'difficile') pool = pool.filter((q) => q.difficulty === 'difficile')
  if (config.mediaFilter === 'sans-media') pool = pool.filter((q) => q.type === 'texte')
  if (config.mediaFilter === 'media') pool = pool.filter((q) => q.type !== 'texte')
  return pool
}

/**
 * Sélection sans remise pour une partie.
 * distribution: 'equilibree' | 'aleatoire' | 'manuelle' (config.manualCounts = {catId: n})
 */
export function selectQuestions(config) {
  const pool = poolFor(config)
  const n = Math.min(config.numQuestions, pool.length)
  if (config.distribution === 'manuelle' && config.manualCounts) {
    const picked = []
    for (const cat of CATEGORIES) {
      const want = Math.min(config.manualCounts[cat.id] || 0, 999)
      const catPool = shuffle(pool.filter((q) => q.category === cat.id))
      picked.push(...catPool.slice(0, want))
    }
    // complète au hasard si le total manuel < n demandé
    if (picked.length >= n) return shuffle(picked.slice(0, n))
    const rest = shuffle(pool.filter((q) => !picked.includes(q)))
    return shuffle([...picked, ...rest.slice(0, n - picked.length)])
  }
  if (config.distribution === 'equilibree') {
    const byCat = CATEGORIES.map((c) => shuffle(pool.filter((q) => q.category === c.id)))
    const picked = []
    let round = 0
    while (picked.length < n && byCat.some((b) => b.length > round)) {
      for (const b of byCat) if (b[round]) picked.push(b[round])
      round++
    }
    return shuffle(picked.slice(0, n))
  }
  return shuffle(pool).slice(0, n)
}

export function estimateDurationMin(config, pickedCount) {
  const perQ = config.timerSec + 12 // temps de révélation / transition
  return Math.max(1, Math.round(((pickedCount ?? config.numQuestions) * perQ) / 60))
}
