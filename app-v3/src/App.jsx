import { useEffect, useMemo, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { ALL_QUESTIONS, CATEGORIES, categoryOf, estimateDurationMin, selectQuestions, isPlayable } from './lib/questions'
import { emptyRoom, genCode, loadRoom, mutateRoom, roomBackend, saveRoom, setAnswer, subscribeRoom, uid } from './lib/room'
import { curseAvailability, scoreCurrentQuestion, teamStandings } from './lib/scoring'
import { mediaUrl } from './lib/mediaUrl'

const TEAM_PRESETS = [
  { name: '🎃 Citrouilles', color: '#ff7a1a' },
  { name: '👻 Fantômes', color: '#efe4cf' },
  { name: '🧛 Vampires', color: '#e0324b' },
  { name: '🕷️ Araignées', color: '#a78bfa' },
  { name: '🦇 Chauves-souris', color: '#38bdf8' },
  { name: '🦴 Squelettes', color: '#a6e36b' },
]
const SYMBOLS = ['🎃', '👻', '🦇', '🕷️']
const playableCount = ALL_QUESTIONS.filter(isPlayable).length
const freshPowers = () => ({ double: false, skip: false, fifty: false, curse: false })

const defaultConfig = () => ({
  numQuestions: 30,
  distribution: 'equilibree',
  manualCounts: Object.fromEntries(CATEGORIES.map((c) => [c.id, 5])),
  difficulty: 'mixte',
  mediaFilter: 'mixte',
  physiatrie: true,
  timerSec: 30,
  autoAdvance: true,
  autoDelaySec: 8,
  cursePenalty: 250,
  curseCooldown: 4,
  mode: 'solo',
  consensus: false,
  teamScoreMethod: 'moyenne',
  teamCount: 4,
  teamNames: TEAM_PRESETS.map((t) => t.name),
  hostPlays: false,
  hostName: '',
})

function Btn({ children, onClick, kind = 'primaire', disabled, className = '', type = 'button' }) {
  const styles = {
    primaire: 'bg-citrouille text-encre hover:brightness-110',
    discret: 'bg-white/10 text-os hover:bg-white/15',
    sang: 'bg-sang text-white hover:brightness-110',
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      className={`${styles[kind]} font-bold rounded-xl px-5 py-3 text-base max-w-full break-words disabled:opacity-40 disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  )
}

function Field({ label, children }) {
  return <label className="block text-sm text-os-dim">{label}<div className="mt-1 text-base text-os">{children}</div></label>
}
const selectCls = 'w-full bg-nuit-3 rounded-lg p-2.5 border border-white/10'

// ---------------------------------------------------------------- Médias
function MediaBlock({ q, isHost }) {
  const [plays, setPlays] = useState(0)
  const [failed, setFailed] = useState(false)
  useEffect(() => { setPlays(0); setFailed(false) }, [q.id])
  if (!q.media || !q.media.src) return null
  const url = mediaUrl(q.media.src)
  const openLink = (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm font-semibold text-[#8b3a1a] underline underline-offset-2">
      Ouvrir le média dans un onglet
    </a>
  )
  if (failed) {
    return (
      <div className="my-3 rounded-lg border border-[#8b3a1a]/40 bg-[#8b3a1a]/10 p-3 text-center">
        <p className="text-sm">Le média ne se charge pas ici. Ouvre-le directement :</p>
        {openLink}
      </div>
    )
  }
  if (q.type === 'image') {
    return (
      <figure className="my-3 text-center">
        <img src={url} alt={q.media.alt || 'Image à identifier'} referrerPolicy="no-referrer" onError={() => setFailed(true)}
          className="mx-auto max-h-72 w-auto max-w-full rounded-md border-4 border-white shadow-lg" />
        <figcaption className="text-xs opacity-60 mt-1">{q.media.credit}</figcaption>
        {openLink}
      </figure>
    )
  }
  if (q.type === 'audio') {
    const maxPlays = isHost ? Infinity : 2
    const over = !isHost && plays >= maxPlays
    return (
      <div className="my-3 text-center">
        <audio controls src={url} referrerPolicy="no-referrer" onError={() => setFailed(true)}
          onPlay={(e) => { if (over) { e.currentTarget.pause(); return } setPlays((p) => p + 1) }} className="mx-auto w-full max-w-md" />
        <p className="text-xs opacity-70 mt-1">{isHost ? 'Écoute illimitée pour l’hôte' : `Écoutes : ${Math.min(plays, maxPlays)} sur ${maxPlays}`}</p>
        {openLink}
      </div>
    )
  }
  if (q.type === 'video') {
    return (
      <div className="my-3 text-center">
        <video controls playsInline src={url} onError={() => setFailed(true)} className="mx-auto w-full max-w-md rounded-md border-4 border-white" />
        {openLink}
      </div>
    )
  }
  return null
}

// ---------------------------------------------------------------- Classements
function Leaderboard({ room, players, showDelta }) {
  const sorted = [...players].sort((a, b) => b.score - a.score)
  const teams = teamStandings(room, players)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="panneau p-4 min-w-0">
        <h3 className="titre text-2xl mb-2">Classement</h3>
        <ol className="space-y-1">
          {sorted.map((p, i) => {
            const d = showDelta ? room.lastDetail?.[p.id]?.delta : null
            return (
              <li key={p.id} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 bg-white/5">
                <span className="min-w-0 truncate"><span className="text-os-dim w-6 inline-block">{i + 1}</span>{p.name}{p.streak >= 3 ? ` 🔥${p.streak}` : ''}</span>
                <span className="shrink-0 tabular-nums">
                  {d != null && d !== 0 && <span className={`text-sm mr-2 ${d > 0 ? 'text-ecto' : 'text-sang'}`}>{d > 0 ? '+' : ''}{d}</span>}
                  <b>{p.score}</b>
                </span>
              </li>
            )
          })}
          {!sorted.length && <li className="text-os-dim">Personne n’a encore rejoint. Partage le code ci-dessus.</li>}
        </ol>
      </div>
      {teams.length > 0 && (
        <div className="panneau p-4 min-w-0">
          <h3 className="titre text-2xl mb-2">Équipes <span className="font-corps text-sm text-os-dim">({room.config.teamScoreMethod === 'moyenne' ? 'moyenne des membres' : 'somme des membres'})</span></h3>
          <ol className="space-y-1">
            {teams.map((t, i) => (
              <li key={t.id} className="flex justify-between gap-3 rounded-lg px-3 py-2 bg-white/5">
                <span className="min-w-0 truncate"><span className="text-os-dim w-6 inline-block">{i + 1}</span><span style={{ color: t.color }}>{t.name}</span> <span className="text-os-dim">({t.memberCount})</span></span>
                <b className="tabular-nums">{t.score}</b>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function Podium({ room }) {
  const top = [...room.players].sort((a, b) => b.score - a.score).slice(0, 3)
  const order = [top[1], top[0], top[2]]
  const heights = ['h-24', 'h-36', 'h-16']
  const medals = ['🥈', '🥇', '🥉']
  const teams = teamStandings(room)
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-center gap-2 sm:gap-4 pt-6">
        {order.map((p, i) => p && (
          <div key={p.id} className="flex flex-col items-center w-28 sm:w-36 monte" style={{ animationDelay: `${[0.4, 0.9, 0][i]}s` }}>
            <span className="text-3xl">{medals[i]}</span>
            <span className="font-bold text-center truncate w-full">{p.name}</span>
            <span className="text-os-dim text-sm tabular-nums mb-1">{p.score} pts</span>
            <div className={`w-full ${heights[i]} rounded-t-lg bg-gradient-to-b from-citrouille to-[#8a3a0c]`} />
          </div>
        ))}
      </div>
      {teams.length > 0 && (
        <p className="text-center text-lg">Équipe gagnante : <b style={{ color: teams[0].color }}>{teams[0].name}</b> avec {teams[0].score} pts</p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------- Configuration
function ConfigScreen({ onCreate, onBack }) {
  const [cfg, setCfg] = useState(defaultConfig)
  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }))
  const picked = useMemo(() => selectQuestions(cfg).length, [cfg])
  const isTeam = cfg.mode !== 'solo'
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <h2 className="titre text-5xl mb-1">Préparer la nuit</h2>
      <p className="text-os-dim mb-5">{playableCount} questions dans la banque, dont un tiers avec image ou extrait sonore.</p>
      <div className="panneau p-4 space-y-5">
        <div>
          <p className="font-bold">{cfg.numQuestions} questions · environ {estimateDurationMin(cfg, picked)} minutes</p>
          <input type="range" min="10" max="60" value={cfg.numQuestions} aria-label="Nombre de questions"
            onChange={(e) => set('numQuestions', Number(e.target.value))} className="w-full accent-[#ff7a1a]" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Mode de jeu">
            <select value={cfg.mode} onChange={(e) => set('mode', e.target.value)} className={selectCls}>
              <option value="solo">Chacun pour soi</option>
              <option value="aleatoires">Équipes tirées au sort (équilibrées)</option>
              <option value="libres">Équipes choisies par les joueurs</option>
            </select>
          </Field>
          <Field label="Temps par question">
            <select value={cfg.timerSec} onChange={(e) => set('timerSec', Number(e.target.value))} className={selectCls}>
              <option value={20}>20 secondes</option>
              <option value={30}>30 secondes</option>
              <option value={45}>45 secondes</option>
              <option value={60}>60 secondes</option>
            </select>
          </Field>
          <Field label="Après la réponse">
            <select value={cfg.autoAdvance ? cfg.autoDelaySec : 'off'} onChange={(e) => {
              if (e.target.value === 'off') set('autoAdvance', false)
              else { set('autoAdvance', true); set('autoDelaySec', Number(e.target.value)) }
            }} className={selectCls}>
              <option value="5">Question suivante après 5 s</option>
              <option value="8">Question suivante après 8 s</option>
              <option value="12">Question suivante après 12 s</option>
              <option value="off">L’hôte passe à la suivante</option>
            </select>
          </Field>
          <Field label="Difficulté">
            <select value={cfg.difficulty} onChange={(e) => set('difficulty', e.target.value)} className={selectCls}>
              <option value="mixte">Mélangée</option>
              <option value="intermediaire">Accessible seulement</option>
              <option value="difficile">Corsée seulement</option>
            </select>
          </Field>
          <Field label="Images et sons">
            <select value={cfg.mediaFilter} onChange={(e) => set('mediaFilter', e.target.value)} className={selectCls}>
              <option value="mixte">Mélangés aux questions texte</option>
              <option value="sans-media">Texte seulement</option>
              <option value="media">Images et sons seulement</option>
            </select>
          </Field>
          <Field label="Catégories">
            <select value={cfg.distribution} onChange={(e) => set('distribution', e.target.value)} className={selectCls}>
              <option value="equilibree">Autant de chaque catégorie</option>
              <option value="aleatoire">Au hasard</option>
              <option value="manuelle">Je choisis le nombre</option>
            </select>
          </Field>
        </div>
        {cfg.distribution === 'manuelle' && (
          <div className="grid sm:grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <label key={c.id} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 gap-2">
                <span>{c.icon} {c.short}</span>
                <input type="number" min="0" max="60" value={cfg.manualCounts[c.id]}
                  onChange={(e) => set('manualCounts', { ...cfg.manualCounts, [c.id]: Number(e.target.value) })}
                  className="w-16 bg-nuit-3 rounded p-1 text-center" />
              </label>
            ))}
          </div>
        )}
        <label className="flex items-start gap-2">
          <input type="checkbox" checked={cfg.physiatrie} onChange={(e) => set('physiatrie', e.target.checked)} className="mt-1 accent-[#ff7a1a]" />
          <span>Inclure les clins d’œil physiatrie (environ une question sur dix)</span>
        </label>

        <details className="border-t border-white/10 pt-4">
          <summary className="cursor-pointer font-bold">Règle de la Malédiction</summary>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <Field label="Pénalité pour une mauvaise réponse">
              <select value={cfg.cursePenalty} onChange={(e) => set('cursePenalty', Number(e.target.value))} className={selectCls}>
                <option value={250}>−250 points (recommandé)</option>
                <option value={500}>−500 points (version d’origine)</option>
              </select>
            </Field>
            <Field label="Délai entre deux malédictions">
              <select value={cfg.curseCooldown} onChange={(e) => set('curseCooldown', Number(e.target.value))} className={selectCls}>
                <option value={1}>Aucun délai</option>
                <option value={3}>3 questions</option>
                <option value={4}>4 questions (recommandé)</option>
                <option value={5}>5 questions</option>
              </select>
            </Field>
          </div>
        </details>

        {isTeam && (
          <div className="space-y-3 border-t border-white/10 pt-4">
            <p className="font-bold">{cfg.teamCount} équipes</p>
            <input type="range" min="2" max="6" value={cfg.teamCount} aria-label="Nombre d'équipes" onChange={(e) => set('teamCount', Number(e.target.value))} className="w-full accent-[#ff7a1a]" />
            <div className="grid sm:grid-cols-2 gap-2">
              {Array.from({ length: cfg.teamCount }).map((_, i) => (
                <input key={i} value={cfg.teamNames[i]} aria-label={`Nom de l'équipe ${i + 1}`}
                  onChange={(e) => { const n = [...cfg.teamNames]; n[i] = e.target.value; set('teamNames', n) }}
                  className="bg-nuit-3 rounded-lg p-2" />
              ))}
            </div>
            <label className="flex items-start gap-2">
              <input type="checkbox" checked={cfg.consensus} onChange={(e) => set('consensus', e.target.checked)} className="mt-1 accent-[#ff7a1a]" />
              <span>Vote d’équipe : la réponse majoritaire compte pour toute l’équipe (égalité : le capitaine tranche)</span>
            </label>
            <Field label="Score d’équipe">
              <select value={cfg.teamScoreMethod} onChange={(e) => set('teamScoreMethod', e.target.value)} className={selectCls}>
                <option value="moyenne">Moyenne des membres (juste si les équipes sont inégales)</option>
                <option value="somme">Somme des membres</option>
              </select>
            </Field>
            <p className="text-sm text-os-dim">En équipe, chaque pouvoir s’utilise une fois par équipe : une grande équipe n’a pas plus de pouvoirs qu’une petite.</p>
          </div>
        )}
        <label className="flex items-start gap-2 border-t border-white/10 pt-4">
          <input type="checkbox" checked={cfg.hostPlays} onChange={(e) => set('hostPlays', e.target.checked)} className="mt-1 accent-[#ff7a1a]" />
          <span>Je joue aussi depuis cet appareil</span>
        </label>
        {cfg.hostPlays && (
          <input value={cfg.hostName} onChange={(e) => set('hostName', e.target.value)} placeholder="Ton pseudo" aria-label="Pseudo de l'hôte" className="w-full bg-nuit-3 rounded-lg p-2.5" />
        )}
      </div>
      <div className="flex flex-wrap gap-3 mt-5">
        <Btn onClick={onBack} kind="discret">Retour</Btn>
        <Btn onClick={() => onCreate(cfg)} disabled={cfg.hostPlays && !cfg.hostName.trim()}>Ouvrir la salle</Btn>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- Partie
function RoomView({ code, role, setRole }) {
  const [room, setRoom] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [myId, setMyId] = useState(() => sessionStorage.getItem(`hq_me_${code}`) || '')
  const [name, setName] = useState('')
  const [teamPick, setTeamPick] = useState('')
  const [now, setNow] = useState(Date.now())
  const [notice, setNotice] = useState('')
  const roomRef = useRef(room)
  roomRef.current = room
  // Horloge locale par question : le temps de réponse est mesuré sur l'appareil
  // du joueur, à partir du moment où la question s'y affiche — l'écart d'horloge
  // entre téléphones ne favorise ni ne pénalise personne.
  const localStart = useRef({ index: -1, at: 0 })

  useEffect(() => {
    let alive = true
    const accept = (r) => setRoom((cur) => (!cur || (r._v || 0) >= (cur._v || 0) ? r : cur))
    loadRoom(code).then((r) => { if (!alive) return; if (r) accept(r); setLoaded(true) }).catch(() => { if (alive) setLoaded(true) })
    const unsub = subscribeRoom(code, (r) => { accept(r); setLoaded(true) })
    return () => { alive = false; unsub() }
  }, [code])

  if (room && room.status === 'question' && localStart.current.index !== room.currentIndex) {
    localStart.current = { index: room.currentIndex, at: Date.now() }
  }

  const isHost = role === 'host'
  const me = room?.players.find((p) => p.id === myId)

  const update = async (mut) => {
    try {
      const next = await mutateRoom(code, mut)
      if (next) setRoom((cur) => (!cur || (next._v || 0) >= (cur._v || 0) ? next : cur))
    } catch (e) {
      console.error('[room] mutateRoom:', e)
      setNotice('La partie ne s’est pas synchronisée. Vérifie ta connexion et réessaie.')
    }
  }

  useEffect(() => {
    if (room?.status !== 'question' && room?.status !== 'reveal') return
    const t = setInterval(() => setNow(Date.now()), 200)
    return () => clearInterval(t)
  }, [room?.status, room?.currentIndex])

  const question = room ? ALL_QUESTIONS.find((q) => q.id === room.questionIds[room.currentIndex]) : null
  const validAnswer = (a) => a && (a.qIndex == null || a.qIndex === room?.currentIndex)
  const timerMs = (room?.config?.timerSec || 30) * 1000
  const startedAt = isHost ? room?.questionStartedAt : localStart.current.at
  const elapsed = room && startedAt ? now - startedAt : 0
  const timeLeft = room ? Math.max(0, Math.ceil((timerMs - elapsed) / 1000)) : 0
  const answeredCount = room ? room.players.filter((p) => validAnswer(room.answers[p.id])).length : 0

  function doReveal() {
    update((d) => {
      if (d.scoredIndex === d.currentIndex || d.status !== 'question') return false
      const q = ALL_QUESTIONS.find((x) => x.id === d.questionIds[d.currentIndex])
      // On ignore toute réponse tardive d'une question précédente
      for (const [pid, a] of Object.entries(d.answers)) if (a.qIndex != null && a.qIndex !== d.currentIndex) delete d.answers[pid]
      const { players, detail } = scoreCurrentQuestion(d, q)
      d.players = players
      d.lastDetail = detail
      d.scoredIndex = d.currentIndex
      d.status = 'reveal'
      d.revealStartedAt = Date.now()
    })
  }

  // Révélation : fin du timer (horloge de l'hôte, +1 s de grâce réseau) ou tout le monde a répondu
  const hostElapsed = room?.questionStartedAt ? now - room.questionStartedAt : 0
  useEffect(() => {
    if (!isHost || !room || room.status !== 'question' || room.players.length === 0) return
    if (hostElapsed < timerMs + 1000 && answeredCount < room.players.length) return
    if (room.scoredIndex === room.currentIndex) return
    const t = setTimeout(() => doReveal(), 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Math.floor(hostElapsed / 1000), answeredCount, room?.status, isHost])

  // Bots de démonstration (pilotés par l'hôte)
  useEffect(() => {
    if (!isHost || !room || room.status !== 'question' || !question) return
    const idx = room.currentIndex
    const timers = room.players.filter((p) => p.isBot && !room.answers[p.id]).map((bot) =>
      setTimeout(() => {
        const knows = Math.random() < 0.5
        const choice = knows ? question.correctIndex : Math.floor(Math.random() * 4)
        setAnswer(code, bot.id, { choice, elapsedMs: 2000 + Math.random() * (timerMs * 0.6), qIndex: idx }).catch(() => {})
      }, 1500 + Math.random() * 5000))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.status, room?.currentIndex, isHost])

  // ⚠️ Tous les hooks restent AVANT le retour anticipé « if (!room) » (bug du Lot 8).
  const autoOn = room?.config?.autoAdvance !== false
  const autoDelayMs = (room?.config?.autoDelaySec || 8) * 1000
  const revealElapsed = room?.status === 'reveal' && room?.revealStartedAt ? now - room.revealStartedAt : 0
  const revealLeftSec = Math.max(0, Math.ceil((autoDelayMs - revealElapsed) / 1000))
  const revealPct = Math.max(0, Math.min(100, 100 - (revealElapsed / autoDelayMs) * 100))

  useEffect(() => {
    if (!isHost || !room || room.status !== 'reveal' || !autoOn || !room.revealStartedAt) return
    const remaining = autoDelayMs - (Date.now() - room.revealStartedAt)
    const t = setTimeout(() => nextQuestion(), Math.max(0, remaining))
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost, room?.status, room?.currentIndex, room?.revealStartedAt, autoOn, autoDelayMs])

  if (!room) {
    if (!loaded) return <div className="p-8 text-center">Ouverture de la salle {code}…</div>
    return (
      <div className="p-8 text-center space-y-3">
        <p>Aucune partie ne porte le code « {code} ». Vérifie le code ou demande un nouveau lien à l’hôte.</p>
        <a className="underline" href="./">Revenir à l’accueil</a>
      </div>
    )
  }

  const joinUrl = `${window.location.origin}${window.location.pathname}?room=${room.code}`
  const isTeamMode = room.config.mode !== 'solo'

  function recomputeCaptains(d) {
    for (const t of d.teams) d.players.filter((p) => p.teamId === t.id).forEach((m, i) => { m.isCaptain = i === 0 })
  }

  function join() {
    const pseudo = name.trim()
    if (!pseudo) return
    const id = uid()
    update((d) => {
      if (d.status !== 'lobby') return false
      const teamId = d.config.mode === 'libres' ? (teamPick || d.teams[0]?.id) : null
      d.players.push({ id, name: pseudo, teamId, score: 0, streak: 0, isCaptain: false, isBot: false, powers: freshPowers() })
      recomputeCaptains(d)
    })
    sessionStorage.setItem(`hq_me_${code}`, id)
    setMyId(id)
    setRole('player')
  }

  function addBot() {
    update((d) => {
      const n = d.players.filter((p) => p.isBot).length + 1
      const teamId = d.config.mode !== 'solo' ? d.teams[(n - 1) % d.teams.length]?.id : null
      d.players.push({ id: uid(), name: `Bot ${n}`, teamId, score: 0, streak: 0, isCaptain: false, isBot: true, powers: freshPowers() })
      recomputeCaptains(d)
    })
  }

  function startGame() {
    const qs = selectQuestions(room.config)
    update((d) => {
      if (d.status !== 'lobby') return false
      if (d.config.mode === 'aleatoires') {
        const shuffled = [...d.players].sort(() => Math.random() - 0.5)
        shuffled.forEach((p, i) => { d.players.find((x) => x.id === p.id).teamId = d.teams[i % d.teams.length].id })
        recomputeCaptains(d)
      }
      d.questionIds = qs.map((q) => q.id)
      d.currentIndex = 0
      d.status = 'question'
      d.revealStartedAt = null
      d.questionStartedAt = Date.now()
      d.answers = {}
      d.round = { doubleBy: [], fiftyBy: {}, cursedBy: null }
      d.lastCurseIndex = -999
    })
  }

  function nextQuestion() {
    update((d) => {
      if (d.status !== 'reveal') return false
      d.revealStartedAt = null
      if (d.currentIndex + 1 >= d.questionIds.length) { d.status = 'finished'; return }
      d.currentIndex += 1
      d.status = 'question'
      d.questionStartedAt = Date.now()
      d.answers = {}
      d.round = { doubleBy: [], fiftyBy: {}, cursedBy: null }
    })
  }

  const myAnswer = me && validAnswer(room.answers[me.id]) ? room.answers[me.id] : null
  const hiddenByFifty = me ? room.round.fiftyBy[me.id] || [] : []
  const curse = curseAvailability(room)

  function usePower(kind) {
    if (!me || me.powers[kind] || myAnswer) return
    if (kind === 'curse' && !curse.ok) {
      setNotice(curse.reason === 'active'
        ? 'Une Malédiction pèse déjà sur cette question. La tienne reste disponible.'
        : `La Malédiction se recharge : encore ${curse.waitQuestions} question${curse.waitQuestions > 1 ? 's' : ''}. La tienne reste disponible.`)
      return
    }
    setNotice('')
    const elapsedMs = Math.min(timerMs, Date.now() - localStart.current.at)
    update((d) => {
      if (d.status !== 'question') return false
      const p = d.players.find((x) => x.id === me.id)
      if (!p || p.powers[kind]) return false
      if (kind === 'curse' && !curseAvailability(d).ok) return false
      // En équipe, un pouvoir utilisé l'est pour toute l'équipe
      const owners = d.config.mode !== 'solo' && p.teamId ? d.players.filter((x) => x.teamId === p.teamId) : [p]
      owners.forEach((o) => { o.powers[kind] = true })
      if (kind === 'skip') d.answers[me.id] = { skipped: true, elapsedMs, qIndex: d.currentIndex }
      if (kind === 'double') d.round.doubleBy.push(me.id)
      if (kind === 'curse') { d.round.cursedBy = me.id; d.lastCurseIndex = d.currentIndex }
      if (kind === 'fifty') {
        const q = ALL_QUESTIONS.find((x) => x.id === d.questionIds[d.currentIndex])
        const wrong = q.choices.map((_, i) => i).filter((i) => i !== q.correctIndex)
        d.round.fiftyBy[me.id] = wrong.sort(() => Math.random() - 0.5).slice(0, 2)
      }
    })
  }

  function answer(choice) {
    if (myAnswer || !me) return
    const elapsedMs = Math.min(timerMs, Date.now() - localStart.current.at)
    const a = { choice, elapsedMs, qIndex: room.currentIndex }
    setRoom((cur) => ({ ...cur, answers: { ...cur.answers, [me.id]: a } })) // retour visuel immédiat
    setAnswer(code, me.id, a).catch((e) => { console.error(e); setNotice('Ta réponse n’a pas été envoyée. Vérifie ta connexion.') })
  }

  const cat = question ? categoryOf(question.category) : null
  const counts = question ? [0, 1, 2, 3].map((i) => room.players.filter((p) => room.answers[p.id]?.choice === i).length) : []
  const cursedName = room.round.cursedBy ? room.players.find((p) => p.id === room.round.cursedBy)?.name : null
  const penalty = room.config.cursePenalty ?? 250

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <header className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <a href="./" className="titre text-2xl text-citrouille">La Nuit des Physiatres</a>
        <span className="text-sm text-os-dim">Salle <b className="text-os tracking-widest">{room.code}</b> · {room.players.length} joueur{room.players.length > 1 ? 's' : ''}{roomBackend === 'local' ? ' · démo locale' : ''}</span>
      </header>

      {notice && <div role="status" className="rounded-xl p-3 mb-3 bg-sang/15 border border-sang/60">{notice}</div>}

      {room.status === 'lobby' && (
        <div className="space-y-4">
          <div className="panneau p-4 flex flex-col sm:flex-row gap-5 items-center">
            <div className="bg-white p-2 rounded-xl shrink-0"><QRCodeSVG value={joinUrl} size={140} /></div>
            <div className="min-w-0 w-full text-center sm:text-left">
              <p className="text-os-dim">Code de la salle</p>
              <p className="titre text-6xl tracking-[.12em] text-citrouille">{room.code}</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                <Btn kind="discret" onClick={() => { navigator.clipboard?.writeText(joinUrl); setNotice('Lien copié.') }}>Copier le lien</Btn>
                {isHost && <Btn kind="discret" onClick={() => window.open(joinUrl, '_blank')}>Ouvrir un onglet joueur</Btn>}
              </div>
              <p className="text-sm text-os-dim mt-2">{room.config.numQuestions} questions de {room.config.timerSec} s · Malédiction −{penalty} pts</p>
            </div>
          </div>

          {!me && !isHost && (
            <form className="panneau p-4 space-y-3" onSubmit={(e) => { e.preventDefault(); join() }}>
              <h3 className="titre text-3xl">Entrer dans la salle</h3>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ton pseudo" maxLength={20} aria-label="Ton pseudo" className="w-full bg-nuit-3 rounded-lg p-3 text-lg" />
              {room.config.mode === 'libres' && (
                <div className="flex flex-wrap gap-2">
                  {room.teams.map((t) => (
                    <button type="button" key={t.id} onClick={() => setTeamPick(t.id)}
                      className={`rounded-full px-3 py-2 border ${(teamPick || room.teams[0].id) === t.id ? 'bg-citrouille text-encre border-citrouille' : 'bg-white/5 border-white/15'}`}>
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
              <Btn type="submit" disabled={!name.trim()} className="w-full">Entrer</Btn>
            </form>
          )}
          {me && <p className="panneau p-3">Tu es dans la salle sous le nom <b>{me.name}</b>{me.isCaptain ? ', capitaine de ton équipe' : ''}. La partie commence quand l’hôte la lance.</p>}

          <Leaderboard room={room} players={room.players} />

          {isHost && (
            <div className="flex flex-wrap gap-3">
              <Btn onClick={startGame} disabled={room.players.length === 0}>Lancer la partie</Btn>
              <Btn kind="discret" onClick={addBot}>Ajouter un bot de test</Btn>
            </div>
          )}
        </div>
      )}

      {(room.status === 'question' || room.status === 'reveal') && question && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm" style={{ color: cat?.color }}>{cat?.icon} {cat?.short}{question.physiatrie ? ' · 🦴 clin d’œil physiatrie' : ''}</span>
            <span className="text-sm text-os-dim tabular-nums">{room.currentIndex + 1} / {room.questionIds.length}</span>
          </div>
          {room.status === 'question' ? (
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded-full h-2.5 overflow-hidden" aria-hidden="true">
                <div className={`h-full rounded-full ${timeLeft <= 5 ? 'bg-sang' : 'bg-citrouille'}`} style={{ width: `${Math.min(100, (timeLeft / room.config.timerSec) * 100)}%`, transition: 'width .2s linear' }} />
              </div>
              <span className={`tabular-nums font-bold w-10 text-right ${timeLeft <= 5 ? 'text-sang battement' : ''}`} aria-live="off">{timeLeft}s</span>
              <span className="text-sm text-os-dim tabular-nums">{answeredCount}/{room.players.length} ont répondu</span>
            </div>
          ) : null}

          {room.round.cursedBy && (
            <div className="bandeau-mal rounded-xl p-3 text-center">
              <p className="titre text-2xl text-white">☠️ Maudite par {cursedName}</p>
              <p className="text-sm">Pour tout le monde : bonne réponse à moitié prix, mauvaise réponse ou silence −{penalty} pts.</p>
            </div>
          )}

          <article className="etiquette p-5 sm:p-7">
            <p className="num text-lg mb-1">Spécimen n° {room.currentIndex + 1}</p>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">{question.question}</h3>
            <MediaBlock q={question} isHost={isHost && !me} />
            {room.status === 'reveal' && (
              <div className="mt-4 border-t border-[#8b6a45]/40 pt-3">
                <p className="font-extrabold">{SYMBOLS[question.correctIndex]} {question.choices[question.correctIndex]}</p>
                <p className="mt-1 leading-relaxed">{question.explanation}</p>
              </div>
            )}
          </article>

          {room.config.consensus && room.teams.length > 0 && room.status === 'question' && (
            <p className="text-sm text-os-dim">Vote d’équipe : la réponse majoritaire de ton équipe comptera.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.choices.map((c, i) => {
              const hidden = hiddenByFifty.includes(i) && room.status === 'question'
              const reveal = room.status === 'reveal'
              const isCorrect = reveal && i === question.correctIndex
              const isMine = myAnswer?.choice === i
              const dim = reveal && !isCorrect
              return (
                <button key={i} disabled={hidden || !me || room.status !== 'question' || Boolean(myAnswer)} onClick={() => answer(i)}
                  className={`rep rep-${i} px-4 py-3 w-full text-white flex items-center gap-3 disabled:cursor-default
                    ${hidden ? 'opacity-20 line-through' : ''} ${dim ? 'opacity-35' : ''} ${isCorrect ? 'ring-4 ring-ecto' : ''} ${isMine && !reveal ? 'ring-4 ring-os' : ''} ${myAnswer && !isMine && !reveal ? 'opacity-50' : ''}`}>
                  <span className="text-2xl shrink-0" aria-hidden="true">{SYMBOLS[i]}</span>
                  <span className="flex-1">{c}</span>
                  {reveal && <span className="shrink-0 text-sm tabular-nums bg-black/30 rounded-full px-2 py-0.5" aria-label={`${counts[i]} réponses`}>{counts[i]}</span>}
                  {isMine && <span className="shrink-0 text-sm">{reveal ? (isCorrect ? '✓ toi' : 'toi') : 'ta réponse'}</span>}
                </button>
              )
            })}
          </div>

          {me && room.status === 'question' && !myAnswer && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                ['double', '×2', 'Double'],
                ['fifty', '½', '50/50'],
                ['skip', '⏭', 'Passer'],
                ['curse', '☠️', 'Maudire'],
              ].map(([k, icon, label]) => {
                const used = me.powers[k]
                const waiting = k === 'curse' && !used && !curse.ok
                return (
                  <button key={k} onClick={() => usePower(k)} disabled={used}
                    className={`rounded-xl px-3 py-2.5 border text-left ${k === 'curse' ? 'border-sang/60 bg-sang/10' : 'border-white/15 bg-white/5'} disabled:opacity-30`}>
                    <span className="font-bold">{icon} {label}</span>
                    <span className="block text-xs text-os-dim">{used ? (isTeamMode ? 'utilisé par l’équipe' : 'utilisé') : waiting ? (curse.reason === 'active' ? 'déjà active' : `dans ${curse.waitQuestions} q.`) : '1 fois'}</span>
                  </button>
                )
              })}
            </div>
          )}

          {me && myAnswer && room.status === 'question' && <p className="text-os-dim">{myAnswer.skipped ? 'Question passée : 0 point, ta série est conservée.' : 'Réponse envoyée. On attend les autres.'}</p>}
          {room.status === 'reveal' && me && room.lastDetail[me.id] && (
            <p className="text-lg font-bold">
              {room.lastDetail[me.id].outcome === 'correct' ? 'Bonne réponse' : room.lastDetail[me.id].outcome === 'skipped' ? 'Question passée' : room.lastDetail[me.id].outcome === 'absent' ? 'Pas de réponse' : 'Raté'}
              {' : '}<span className={room.lastDetail[me.id].delta > 0 ? 'text-ecto' : room.lastDetail[me.id].delta < 0 ? 'text-sang' : 'text-os-dim'}>{room.lastDetail[me.id].delta > 0 ? '+' : ''}{room.lastDetail[me.id].delta} pts</span>
            </p>
          )}

          {room.status === 'reveal' && (
            <>
              {autoOn && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden"><div className="bg-os-dim h-full" style={{ width: `${revealPct}%` }} /></div>
                  <span className="text-sm text-os-dim">{room.currentIndex + 1 >= room.questionIds.length ? `Podium dans ${revealLeftSec} s` : `Suivante dans ${revealLeftSec} s`}</span>
                </div>
              )}
              {isHost && <Btn onClick={nextQuestion}>{room.currentIndex + 1 >= room.questionIds.length ? 'Afficher le podium' : 'Question suivante'}</Btn>}
              <Leaderboard room={room} players={room.players} showDelta />
            </>
          )}
          {room.status === 'question' && isHost && <Btn kind="discret" onClick={doReveal}>Révéler la réponse maintenant</Btn>}
        </div>
      )}

      {room.status === 'finished' && (
        <div className="space-y-6">
          <h3 className="titre text-5xl text-center">Fin de la nuit</h3>
          <Podium room={room} />
          <Leaderboard room={room} players={room.players} />
          <div className="text-center"><a href="./" className="inline-block bg-citrouille text-encre font-bold rounded-xl px-5 py-3">Préparer une nouvelle partie</a></div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------- Accueil
export default function App() {
  const params = new URLSearchParams(window.location.search)
  const [view, setView] = useState(params.get('room') ? 'room' : 'home')
  const [role, setRole] = useState(params.get('room') ? 'player' : null)
  const [code, setCode] = useState((params.get('room') || '').toUpperCase())
  const [joinCode, setJoinCode] = useState('')
  const [err, setErr] = useState('')

  async function createRoom(cfg) {
    const newCode = genCode()
    const teams = cfg.mode === 'solo' ? [] : Array.from({ length: cfg.teamCount }).map((_, i) => ({
      id: uid(), name: cfg.teamNames[i] || TEAM_PRESETS[i].name, color: TEAM_PRESETS[i].color,
    }))
    const room = emptyRoom(newCode, { ...cfg, teams })
    if (cfg.hostPlays && cfg.hostName.trim()) {
      const id = uid()
      room.players.push({ id, name: cfg.hostName.trim(), teamId: cfg.mode === 'libres' ? teams[0]?.id ?? null : null, score: 0, streak: 0, isCaptain: Boolean(teams[0]), isBot: false, powers: freshPowers() })
      sessionStorage.setItem(`hq_me_${newCode}`, room.players[0].id)
    }
    try {
      await saveRoom(room)
    } catch (e) {
      console.error(e); setErr('La salle n’a pas pu être créée. Vérifie ta connexion et réessaie.'); return
    }
    setCode(newCode); setRole('host'); setView('room')
    window.history.replaceState(null, '', `?room=${newCode}`)
  }

  if (view === 'config') return <ConfigScreen onCreate={createRoom} onBack={() => setView('home')} />
  if (view === 'room' && code) return <RoomView code={code} role={role} setRole={setRole} />

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-10 sm:py-16">
      <p className="text-os-dim">Quiz d’Halloween multijoueur</p>
      <h1 className="titre text-6xl sm:text-7xl mt-1 text-citrouille">La Nuit des Physiatres</h1>
      <p className="mt-4 text-lg leading-relaxed max-w-prose">
        Affiches de films, extraits sonores, légendes et anatomie macabre : 480 questions pour une trentaine de minutes entre résidents. Chacun répond sur son téléphone.
      </p>
      {err && <p role="alert" className="mt-4 rounded-xl p-3 bg-sang/15 border border-sang/60">{err}</p>}
      <div className="mt-8 space-y-6">
        <Btn className="w-full text-lg py-4" onClick={() => setView('config')}>Créer une partie</Btn>
        <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); if (joinCode.length === 6) { setCode(joinCode); setRole('player'); setView('room'); window.history.replaceState(null, '', `?room=${joinCode}`) } }}>
          <label htmlFor="code" className="text-os-dim text-sm">Tu as un code ? Rejoins la salle</label>
          <div className="flex gap-2">
            <input id="code" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} placeholder="ABC234" maxLength={6} autoComplete="off"
              className="flex-1 min-w-0 bg-nuit-2 border border-white/15 rounded-xl p-3 text-center text-xl tracking-[.3em]" />
            <Btn type="submit" kind="discret" disabled={joinCode.length !== 6}>Rejoindre</Btn>
          </div>
        </form>
      </div>
      <dl className="mt-12 grid grid-cols-2 gap-4 text-sm">
        <div><dt className="font-bold">×2 Double</dt><dd className="text-os-dim">Double les points de vitesse d’une question.</dd></div>
        <div><dt className="font-bold">½ 50/50</dt><dd className="text-os-dim">Retire deux mauvaises réponses, pour toi seul.</dd></div>
        <div><dt className="font-bold">⏭ Passer</dt><dd className="text-os-dim">0 point, mais ta série et ton score sont protégés.</dd></div>
        <div><dt className="font-bold text-sang">☠️ Maudire</dt><dd className="text-os-dim">Pour tous : bonne réponse à moitié prix, erreur −250. Au plus une toutes les 4 questions.</dd></div>
      </dl>
      {roomBackend === 'local' && <p className="mt-8 text-xs text-os-dim">Mode démo : les parties ne fonctionnent qu’entre onglets de ce navigateur.</p>}
    </div>
  )
}
