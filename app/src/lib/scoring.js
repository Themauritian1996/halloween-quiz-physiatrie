// Scoring — SPEC_v2.md §1 et §5
// Base vitesse : 500 + 500 * (temps restant / temps total), arrondi, si bonne réponse.
// Double points : x2 sur la base (avant Malédiction).
// MALÉDICTION (active pour tous) : bonne réponse = 50 % ; mauvaise ou absente = -500.
// Bonus série : +150 chaque fois que la série atteint un multiple de 3
//   (le bonus série n'est ni doublé ni coupé, conformément à la spec).
// Sauter : 0 pt, série conservée.
// Le score cumulé d'un joueur ne passe jamais sous 0 (plancher appliqué après chaque question).

export function baseSpeedPoints(elapsedMs, timerSec) {
  const total = timerSec * 1000
  const remaining = Math.max(0, total - elapsedMs)
  return Math.round(500 + 500 * (remaining / total))
}

/** Réponse effective d'un joueur selon le mode (consensus d'équipe ou individuelle). */
export function effectiveChoice(room, question, player) {
  const ans = room.answers[player.id]
  if (!room.config.consensus || !player.teamId) return ans
  const mates = room.players.filter((p) => p.teamId === player.teamId)
  const votes = mates.map((p) => room.answers[p.id]).filter((a) => a && !a.skipped && a.choice != null)
  if (!votes.length) return ans
  const tally = {}
  for (const v of votes) tally[v.choice] = (tally[v.choice] || 0) + 1
  const max = Math.max(...Object.values(tally))
  const winners = Object.keys(tally).filter((k) => tally[k] === max).map(Number)
  if (winners.length === 1) return { ...ans, choice: winners[0] }
  // Égalité : réponse du capitaine d'équipe
  const captain = mates.find((p) => p.isCaptain)
  const capAns = captain ? room.answers[captain.id] : null
  if (capAns && !capAns.skipped && capAns.choice != null) return { ...ans, choice: capAns.choice }
  return { ...ans, choice: winners[0] }
}

/**
 * Calcule les points de la question courante pour tous les joueurs.
 * Renvoie un nouvel objet players mis à jour + le détail par joueur.
 */
export function scoreCurrentQuestion(room, question) {
  const cursed = Boolean(room.round?.cursedBy)
  const detail = {}
  const players = room.players.map((p) => {
    const raw = room.answers[p.id]
    const eff = effectiveChoice(room, question, p)
    let delta = 0
    let outcome = 'absent'
    let streak = p.streak || 0

    if (raw?.skipped) {
      outcome = 'skipped' // 0 pt, série conservée, même sous Malédiction (question passée, pas tentée)
    } else if (eff && eff.choice != null) {
      const correct = eff.choice === question.correctIndex
      if (correct) {
        outcome = 'correct'
        let pts = baseSpeedPoints(eff.elapsedMs ?? room.config.timerSec * 1000, room.config.timerSec)
        if (room.round?.doubleBy?.includes(p.id)) pts *= 2
        if (cursed) pts = Math.round(pts / 2)
        delta += pts
        streak += 1
        if (streak % 3 === 0) delta += 150 // bonus série
      } else {
        outcome = 'wrong'
        streak = 0
        if (cursed) delta -= 500
      }
    } else {
      outcome = 'absent'
      streak = 0
      if (cursed) delta -= 500
    }

    const score = Math.max(0, (p.score || 0) + delta)
    detail[p.id] = { delta: score - (p.score || 0), outcome, cursed }
    return { ...p, score, streak }
  })
  return { players, detail }
}

/** Classement d'équipe dérivé des scores individuels (somme ou moyenne). */
export function teamStandings(room, players = room.players) {
  if (!room.teams?.length) return []
  return room.teams
    .map((t) => {
      const members = players.filter((p) => p.teamId === t.id)
      const sum = members.reduce((s, p) => s + (p.score || 0), 0)
      const score = room.config.teamScoreMethod === 'moyenne' && members.length ? Math.round(sum / members.length) : sum
      return { ...t, score, memberCount: members.length }
    })
    .sort((a, b) => b.score - a.score)
}
