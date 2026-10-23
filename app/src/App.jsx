import { useEffect, useMemo, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { ALL_QUESTIONS, CATEGORIES, categoryLabel, estimateDurationMin, selectQuestions, isPlayable } from './lib/questions'
import { emptyRoom, genCode, loadRoom, roomBackend, saveRoom, subscribeRoom, uid } from './lib/room'
import { scoreCurrentQuestion, teamStandings } from './lib/scoring'
import { mediaUrl } from './lib/mediaUrl'

const TEAM_PRESETS = [
  { name: '🎃 Citrouilles', color: '#f97316' },
  { name: '👻 Fantômes', color: '#e5e7eb' },
  { name: '🧛 Vampires', color: '#dc2626' },
  { name: '🕷️ Araignées', color: '#a78bfa' },
  { name: '🦇 Chauves-souris', color: '#38bdf8' },
  { name: '🍬 Bonbons', color: '#facc15' },
]
const LETTERS = ['A', 'B', 'C', 'D']
const playableCount = ALL_QUESTIONS.filter(isPlayable).length

const defaultConfig = () => ({
  numQuestions: 30,
  distribution: 'equilibree',
  manualCounts: Object.fromEntries(CATEGORIES.map((c) => [c.id, 5])),
  difficulty: 'mixte',
  mediaFilter: 'mixte',
  timerSec: 45,
  autoAdvance: true,
  autoDelaySec: 8,
  mode: 'solo',
  consensus: false,
  teamScoreMethod: 'somme',
  teamCount: 4,
  teamNames: TEAM_PRESETS.map((t) => t.name),
  hostPlays: false,
  hostName: '',
})

function Btn({ children, onClick, color = 'bg-orange-500 hover:bg-orange-400', disabled, className = '' }) {
  return (
    <button disabled={disabled} onClick={onClick}
      className={`${color} text-white font-bold rounded-xl px-5 py-3 text-base max-w-full break-words disabled:opacity-40 disabled:cursor-not-allowed transition ${className}`}>
      {children}
    </button>
  )
}

function MediaBlock({ q, isHost }) {
  const [plays, setPlays] = useState(0)
  const [failed, setFailed] = useState(false)
  const audioRef = useRef(null)
  useEffect(() => { setPlays(0); setFailed(false) }, [q.id])
  if (!q.media || q.media.kind == null || !q.media.src) return null
  // Tous les médias passent par mediaUrl() : les JSON stockent "/media/…"
  // en absolu, ce qui donnait des 404 sous le sous-chemin GitHub Pages.
  const url = mediaUrl(q.media.src)
  const openLink = (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="inline-block mt-2 text-sm font-semibold text-orange-300 underline underline-offset-2 break-all">
      🔎 Ouvrir le média
    </a>
  )
  if (failed) {
    return (
      <div className="my-3 rounded-xl border border-red-400/50 bg-red-950/40 p-3 text-center">
        <p className="text-sm text-red-200">⚠️ Le média n'a pas pu se charger ici — ouvre-le directement :</p>
        {openLink}
        <p className="text-xs text-white/50 mt-1">{q.media.credit} — {q.media.licence}</p>
      </div>
    )
  }
  if (q.type === 'image') {
    return (
      <figure className="my-3 text-center">
        <img src={url} alt={q.media.alt || ''} referrerPolicy="no-referrer" onError={() => setFailed(true)}
          className="mx-auto max-h-64 w-auto max-w-full rounded-xl border border-white/20" />
        <figcaption className="text-xs text-white/50 mt-1 text-center">{q.media.credit} — {q.media.licence}</figcaption>
        {openLink}
      </figure>
    )
  }
  if (q.type === 'audio') {
    const maxPlays = isHost ? Infinity : 2
    return (
      <div className="my-3 text-center">
        <audio ref={audioRef} controls src={url} referrerPolicy="no-referrer" onError={() => setFailed(true)}
          onPlay={() => setPlays((p) => p + 1)} className="mx-auto w-full max-w-md" />
        <p className="text-xs text-white/60 mt-1">
          {isHost ? 'Lecture hôte (illimitée)' : `Écoutes : ${plays} / ${maxPlays} (replay limité)`}
          {' · '}{q.media.credit} — {q.media.licence}
        </p>
        {!isHost && plays >= maxPlays && <p className="text-xs text-red-300">Limite d'écoutes atteinte pour cette question.</p>}
        {openLink}
      </div>
    )
  }
  if (q.type === 'video') {
    return (
      <div className="my-3 text-center">
        <video controls src={url} referrerPolicy="no-referrer" onError={() => setFailed(true)}
          className="mx-auto w-full max-w-md rounded-xl border border-white/20" />
        <p className="text-xs text-white/50 mt-1 text-center">{q.media.credit} — {q.media.licence}</p>
        {openLink}
      </div>
    )
  }
  return null
}

function Leaderboard({ room, players }) {
  const sorted = [...players].sort((a, b) => b.score - a.score)
  const teams = teamStandings(room, players)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#1e1133] rounded-2xl p-4 min-w-0">
        <h3 className="font-bold mb-2">🏆 Classement individuel</h3>
        <ol className="space-y-1">
          {sorted.map((p, i) => (
            <li key={p.id} className="flex flex-wrap justify-between gap-x-3 bg-white/5 rounded-lg px-3 py-1.5">
              <span>{i + 1}. {p.name} {p.streak >= 3 ? `🔥${p.streak}` : ''}</span>
              <b>{p.score} pts</b>
            </li>
          ))}
          {!sorted.length && <li className="text-white/50">Aucun joueur pour l'instant.</li>}
        </ol>
      </div>
      {teams.length > 0 && (
        <div className="bg-[#1e1133] rounded-2xl p-4">
          <h3 className="font-bold mb-2">👥 Classement des équipes ({room.config.teamScoreMethod})</h3>
          <ol className="space-y-1">
            {teams.map((t, i) => (
              <li key={t.id} className="flex flex-wrap justify-between gap-x-3 bg-white/5 rounded-lg px-3 py-1.5">
                <span>{i + 1}. <span style={{ color: t.color }}>●</span> {t.name} <span className="text-white/40">({t.memberCount})</span></span>
                <b>{t.score} pts</b>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function ConfigScreen({ onCreate, onBack }) {
  const [cfg, setCfg] = useState(defaultConfig)
  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }))
  const picked = useMemo(() => selectQuestions(cfg).length, [cfg])
  const isTeam = cfg.mode !== 'solo'
  return (
    <div className="w-full max-w-3xl mx-auto px-3 py-4 sm:p-4">
      <h2 className="text-3xl font-black mb-1">⚙️ Configurer la partie</h2>
      <p className="text-white/60 mb-4">Banque : {playableCount} questions jouables ({ALL_QUESTIONS.length} au total ; les médias « à compléter » sont exclus automatiquement).</p>
      <div className="bg-[#1e1133] rounded-2xl p-4 space-y-4">
        <div>
          <label className="font-bold">Nombre de questions : {cfg.numQuestions} (éditable, 10 à 60)</label>
          <input type="range" min="10" max="60" step="1" value={cfg.numQuestions}
            onChange={(e) => set('numQuestions', Number(e.target.value))} className="w-full accent-orange-500" />
          <p className="text-sm text-white/60">Sélection réelle : {picked} question(s) · Durée estimée : ~{estimateDurationMin(cfg, picked)} min (timer {cfg.timerSec}s + révélation)</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">Mode de jeu
            <select value={cfg.mode} onChange={(e) => set('mode', e.target.value)} className="w-full mt-1 bg-white/10 rounded-lg p-2">
              <option value="solo">Solo — chacun pour soi</option>
              <option value="libres">Équipes libres — les joueurs choisissent</option>
              <option value="aleatoires">Équipes aléatoires — assignation auto équilibrée</option>
            </select>
          </label>
          <label className="block">Timer par question
            <select value={cfg.timerSec} onChange={(e) => set('timerSec', Number(e.target.value))} className="w-full mt-1 bg-white/10 rounded-lg p-2">
              <option value={30}>30 secondes</option>
              <option value={45}>45 secondes</option>
              <option value={60}>60 secondes</option>
            </select>
          </label>
          <label className="block">Enchaînement après la révélation
            <select value={cfg.autoAdvance ? cfg.autoDelaySec : 'off'} onChange={(e) => {
              if (e.target.value === 'off') set('autoAdvance', false)
              else { set('autoAdvance', true); set('autoDelaySec', Number(e.target.value)) }
            }} className="w-full mt-1 bg-white/10 rounded-lg p-2">
              <option value="5">Automatique — question suivante après 5 s</option>
              <option value="8">Automatique — question suivante après 8 s</option>
              <option value="12">Automatique — question suivante après 12 s</option>
              <option value="off">Manuel — l'hôte clique à chaque question</option>
            </select>
          </label>
          <label className="block">Difficulté
            <select value={cfg.difficulty} onChange={(e) => set('difficulty', e.target.value)} className="w-full mt-1 bg-white/10 rounded-lg p-2">
              <option value="mixte">Mixte (intermédiaire + difficile)</option>
              <option value="intermediaire">Intermédiaire seulement</option>
              <option value="difficile">Difficile seulement</option>
            </select>
          </label>
          <label className="block">Médias
            <select value={cfg.mediaFilter} onChange={(e) => set('mediaFilter', e.target.value)} className="w-full mt-1 bg-white/10 rounded-lg p-2">
              <option value="mixte">Mixte</option>
              <option value="sans-media">Sans média (texte seulement)</option>
              <option value="media">Médias seulement (image / audio / vidéo)</option>
            </select>
          </label>
          <label className="block">Répartition des catégories
            <select value={cfg.distribution} onChange={(e) => set('distribution', e.target.value)} className="w-full mt-1 bg-white/10 rounded-lg p-2">
              <option value="equilibree">Équilibrée entre catégories</option>
              <option value="aleatoire">Aléatoire complète</option>
              <option value="manuelle">Manuelle (ci-dessous)</option>
            </select>
          </label>
        </div>
        {cfg.distribution === 'manuelle' && (
          <div className="grid md:grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <label key={c.id} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                <span>{c.icon} {c.label}</span>
                <input type="number" min="0" max="60" value={cfg.manualCounts[c.id]}
                  onChange={(e) => set('manualCounts', { ...cfg.manualCounts, [c.id]: Number(e.target.value) })}
                  className="w-16 bg-white/10 rounded p-1 text-center" />
              </label>
            ))}
          </div>
        )}
        {isTeam && (
          <div className="space-y-3 border-t border-white/10 pt-3">
            <label className="block">Nombre d'équipes : {cfg.teamCount} (2 à 6)
              <input type="range" min="2" max="6" value={cfg.teamCount} onChange={(e) => set('teamCount', Number(e.target.value))} className="w-full accent-orange-500" />
            </label>
            <div className="grid md:grid-cols-2 gap-2">
              {Array.from({ length: cfg.teamCount }).map((_, i) => (
                <input key={i} value={cfg.teamNames[i]} placeholder={`Équipe ${i + 1}`}
                  onChange={(e) => { const n = [...cfg.teamNames]; n[i] = e.target.value; set('teamNames', n) }}
                  className="bg-white/10 rounded-lg p-2" />
              ))}
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={cfg.consensus} onChange={(e) => set('consensus', e.target.checked)} className="accent-orange-500" />
              Vote consensus : la réponse majoritaire de l'équipe compte (égalité → choix du capitaine)
            </label>
            <label className="block">Score d'équipe
              <select value={cfg.teamScoreMethod} onChange={(e) => set('teamScoreMethod', e.target.value)} className="w-full mt-1 bg-white/10 rounded-lg p-2">
                <option value="somme">Somme des membres</option>
                <option value="moyenne">Moyenne des membres</option>
              </select>
            </label>
          </div>
        )}
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={cfg.hostPlays} onChange={(e) => set('hostPlays', e.target.checked)} className="accent-orange-500" />
          L'hôte joue aussi (depuis cet onglet)
        </label>
        {cfg.hostPlays && (
          <input value={cfg.hostName} onChange={(e) => set('hostName', e.target.value)} placeholder="Pseudo de l'hôte-joueur" className="w-full bg-white/10 rounded-lg p-2" />
        )}
      </div>
      <div className="flex gap-3 mt-4">
        <Btn onClick={onBack} color="bg-white/20">← Retour</Btn>
        <Btn onClick={() => onCreate(cfg)}>🎃 Créer la partie</Btn>
      </div>
    </div>
  )
}

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

  useEffect(() => {
    let alive = true
    loadRoom(code).then((r) => {
      if (!alive) return
      if (r) setRoom((cur) => (!cur || (r._v || 0) >= (cur._v || 0) ? r : cur))
      setLoaded(true)
    }).catch(() => { if (alive) setLoaded(true) })
    const unsub = subscribeRoom(code, (r) => {
      setRoom((cur) => (!cur || (r._v || 0) >= (cur._v || 0) ? r : cur))
      setLoaded(true)
    })
    return () => { alive = false; unsub() }
  }, [code])

  const isHost = role === 'host'
  const me = room?.players.find((p) => p.id === myId)

  const update = async (mut) => {
    const cur = roomRef.current
    if (!cur) return
    const draft = JSON.parse(JSON.stringify(cur))
    mut(draft)
    try {
      const next = await saveRoom(draft)
      setRoom(next)
    } catch (e) {
      console.error('[room] saveRoom:', e)
      setNotice('⚠️ Échec de synchronisation de la partie — vérifie ta connexion puis réessaie.')
    }
  }

  useEffect(() => {
    if (room?.status !== 'question' && room?.status !== 'reveal') return
    const t = setInterval(() => setNow(Date.now()), 200)
    return () => clearInterval(t)
  }, [room?.status, room?.currentIndex])

  const question = room ? ALL_QUESTIONS.find((q) => q.id === room.questionIds[room.currentIndex]) : null
  const timeLeft = room && question && room.questionStartedAt ? Math.max(0, room.config.timerSec - Math.floor((now - room.questionStartedAt) / 1000)) : 0
  const answeredCount = room ? room.players.filter((p) => room.answers[p.id]).length : 0

  function doReveal() {
    update((d) => {
      if (d.scoredIndex === d.currentIndex || d.status !== 'question') return
      const q = ALL_QUESTIONS.find((x) => x.id === d.questionIds[d.currentIndex])
      const { players, detail } = scoreCurrentQuestion(d, q)
      d.players = players
      d.lastDetail = detail
      d.scoredIndex = d.currentIndex
      d.status = 'reveal'
      d.revealStartedAt = Date.now()
    })
  }

  useEffect(() => {
    if (!isHost || !room || room.status !== 'question') return
    if (room.players.length === 0) return
    if (timeLeft > 0 && answeredCount < room.players.length) return
    if (room.scoredIndex === room.currentIndex) return
    const t = setTimeout(() => doReveal(), 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, answeredCount, room?.status, isHost])

  useEffect(() => {
    if (!isHost || !room || room.status !== 'question' || !question) return
    const timers = room.players.filter((p) => p.isBot && !room.answers[p.id]).map((bot) =>
      setTimeout(() => {
        update((d) => {
          if (d.status !== 'question' || d.answers[bot.id]) return
          d.answers[bot.id] = { choice: Math.floor(Math.random() * 4), elapsedMs: 3000 + Math.random() * 8000 }
        })
      }, 2500 + Math.random() * 6000))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.status, room?.currentIndex, isHost])

  // ⚠️ RÈGLE REACT : ces useEffect DOIVENT rester AVANT le retour anticipé
  // « if (!room) » ci-dessous — un hook après un return conditionnel change
  // le nombre de hooks entre rendus et fait planter la page (bug Lot 8).
  // --- Enchaînement automatique après la révélation (piloté par l'hôte) ---
  const autoOn = room?.config?.autoAdvance !== false
  const autoDelayMs = (room?.config?.autoDelaySec || 8) * 1000
  const revealElapsed = room?.status === 'reveal' && room?.revealStartedAt ? now - room.revealStartedAt : 0
  const revealLeftSec = Math.max(0, Math.ceil((autoDelayMs - revealElapsed) / 1000))
  const revealPct = Math.max(0, Math.min(100, 100 - (revealElapsed / autoDelayMs) * 100))

  // Parties créées avant le Lot 8 : si une révélation n'a pas d'horodatage,
  // l'hôte le pose une fois pour démarrer le compte à rebours.
  useEffect(() => {
    if (!isHost || !room || room.status !== 'reveal' || room.revealStartedAt) return
    update((d) => { if (d.status === 'reveal' && !d.revealStartedAt) d.revealStartedAt = Date.now() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost, room?.status, room?.revealStartedAt])

  useEffect(() => {
    if (!isHost || !room || room.status !== 'reveal' || !autoOn) return
    if (!room.revealStartedAt) return
    const remaining = autoDelayMs - (Date.now() - room.revealStartedAt)
    const t = setTimeout(() => nextQuestion(), Math.max(0, remaining))
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost, room?.status, room?.currentIndex, room?.revealStartedAt, autoOn, autoDelayMs])

  if (!room) {
    if (!loaded) return <div className="p-8 text-center">⏳ Chargement de la partie « {code} »…</div>
    return <div className="p-8 text-center">Partie « {code} » introuvable{roomBackend === 'firestore' ? ' — vérifie le code ou demande un nouveau lien à l\'hôte.' : ' sur cet appareil (mode démo local : la partie vit dans le navigateur qui l\'a créée).'} <a className="underline" href="./">Retour à l'accueil</a></div>
  }

  const joinUrl = `${window.location.origin}${window.location.pathname}?room=${room.code}`

  function join() {
    if (!name.trim()) return
    const id = uid()
    update((d) => {
      const teamId = d.config.mode === 'libres' ? (teamPick || d.teams[0]?.id) : null
      d.players.push({ id, name: name.trim(), teamId, score: 0, streak: 0, isCaptain: false, isBot: false, powers: { double: false, skip: false, fifty: false, curse: false } })
      for (const t of d.teams) {
        const members = d.players.filter((p) => p.teamId === t.id)
        members.forEach((m, i) => { m.isCaptain = i === 0 })
      }
    })
    sessionStorage.setItem(`hq_me_${code}`, id)
    setMyId(id)
    setRole('player')
  }

  function addBot() {
    update((d) => {
      const n = d.players.filter((p) => p.isBot).length + 1
      const teamId = d.config.mode !== 'solo' ? d.teams[(n - 1) % d.teams.length]?.id : null
      d.players.push({ id: uid(), name: `🤖 Bot ${n}`, teamId, score: 0, streak: 0, isCaptain: false, isBot: true, powers: { double: false, skip: false, fifty: false, curse: false } })
      for (const t of d.teams) d.players.filter((p) => p.teamId === t.id).forEach((m, i) => { m.isCaptain = i === 0 })
    })
  }

  function startGame() {
    const qs = selectQuestions(room.config)
    update((d) => {
      if (d.config.mode === 'aleatoires') {
        const shuffled = [...d.players].sort(() => Math.random() - 0.5)
        shuffled.forEach((p, i) => { const orig = d.players.find((x) => x.id === p.id); orig.teamId = d.teams[i % d.teams.length].id })
        for (const t of d.teams) d.players.filter((p) => p.teamId === t.id).forEach((m, i) => { m.isCaptain = i === 0 })
      }
      d.questionIds = qs.map((q) => q.id)
      d.currentIndex = 0
      d.status = 'question'
      d.revealStartedAt = null
      d.questionStartedAt = Date.now()
      d.answers = {}
      d.round = { doubleBy: [], fiftyBy: {}, cursedBy: null }
    })
  }

  function nextQuestion() {
    update((d) => {
      d.revealStartedAt = null
      if (d.currentIndex + 1 >= d.questionIds.length) { d.status = 'finished'; return }
      d.currentIndex += 1
      d.status = 'question'
      d.questionStartedAt = Date.now()
      d.answers = {}
      d.round = { doubleBy: [], fiftyBy: {}, cursedBy: null }
    })
  }


  const myAnswer = me ? room.answers[me.id] : null
  const hiddenByFifty = me ? room.round.fiftyBy[me.id] || [] : []

  function usePower(kind) {
    if (!me || me.powers[kind]) return
    if (kind === 'curse' && room.round.cursedBy) { setNotice('☠️ Une Malédiction est déjà active sur cette question — la tienne n\'est pas consommée.'); return }
    if (kind === 'skip') {
      update((d) => {
        const p = d.players.find((x) => x.id === me.id); p.powers.skip = true
        d.answers[me.id] = { skipped: true, elapsedMs: Date.now() - d.questionStartedAt }
      })
      return
    }
    update((d) => {
      const p = d.players.find((x) => x.id === me.id)
      p.powers[kind] = true
      if (kind === 'double') d.round.doubleBy.push(me.id)
      if (kind === 'curse') d.round.cursedBy = me.id
      if (kind === 'fifty') {
        const wrong = question.choices.map((_, i) => i).filter((i) => i !== question.correctIndex)
        d.round.fiftyBy[me.id] = wrong.sort(() => Math.random() - 0.5).slice(0, 2)
      }
    })
  }

  function answer(choice) {
    if (myAnswer) return
    update((d) => { d.answers[me.id] = { choice, elapsedMs: Date.now() - d.questionStartedAt } })
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:p-4">
      <header className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-2xl font-black">🎃 Partie <span className="text-orange-400 tracking-widest">{room.code}</span></h2>
        <span className="text-sm bg-white/10 rounded-full px-3 py-1">
          {roomBackend === 'firestore' ? '☁️ En ligne (Firestore) — appareils différents OK' : '🧪 Mode démo local (même navigateur, plusieurs onglets)'} · {room.players.length} joueur(s)
        </span>
      </header>

      {notice && <div className="bg-red-900/60 border border-red-500 rounded-xl p-3 mb-3">{notice}</div>}

      {room.status === 'lobby' && (
        <div className="space-y-4">
          <div className="bg-[#1e1133] rounded-2xl p-4 flex flex-col md:flex-row flex-wrap gap-6 items-center">
            <div className="flex-1 min-w-0 w-full">
              <p className="font-bold mb-1">📲 Lien de jointure (à partager / projeter) :</p>
              <code className="bg-black/40 rounded px-2 py-1 break-all text-sm">{joinUrl}</code>
              <div className="flex flex-wrap gap-2 mt-2">
                <Btn color="bg-white/20" onClick={() => navigator.clipboard?.writeText(joinUrl)}>Copier le lien</Btn>
                <Btn color="bg-white/20" onClick={() => window.open(joinUrl, '_blank')}>Ouvrir un onglet joueur</Btn>
              </div>
              <p className="text-sm text-white/50 mt-2">Config : {room.config.numQuestions} questions · mode {room.config.mode} · timer {room.config.timerSec}s{room.config.consensus ? ' · consensus activé' : ''}</p>
            </div>
            <div className="bg-white p-2 rounded-xl mx-auto shrink-0"><QRCodeSVG value={joinUrl} size={128} /></div>
          </div>

          {!me && !isHost && (
            <div className="bg-[#1e1133] rounded-2xl p-4 space-y-3">
              <h3 className="font-bold">Rejoindre la partie</h3>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ton pseudo" className="w-full bg-white/10 rounded-lg p-2" />
              {room.config.mode === 'libres' && (
                <div className="flex flex-wrap gap-2">
                  {room.teams.map((t) => (
                    <button key={t.id} onClick={() => setTeamPick(t.id)}
                      className={`rounded-full px-3 py-1.5 border ${(teamPick || room.teams[0].id) === t.id ? 'bg-orange-500 border-orange-300' : 'bg-white/10 border-white/20'}`}>
                      <span style={{ color: t.color }}>●</span> {t.name}
                    </button>
                  ))}
                </div>
              )}
              <Btn onClick={join} disabled={!name.trim()}>👻 Rejoindre</Btn>
            </div>
          )}
          {me && <p className="bg-emerald-900/50 border border-emerald-600 rounded-xl p-3">✅ Tu es dans la partie comme <b>{me.name}</b>{me.isCaptain ? ' (capitaine d\'équipe)' : ''}. En attente du lancement par l'hôte…</p>}

          <Leaderboard room={room} players={room.players} />

          {isHost && (
            <div className="flex flex-wrap gap-3">
              <Btn onClick={startGame} disabled={room.players.length === 0}>▶️ Lancer la partie</Btn>
              <Btn color="bg-white/20" onClick={addBot}>🤖 Ajouter un bot de démo</Btn>
            </div>
          )}
        </div>
      )}

      {(room.status === 'question' || room.status === 'reveal') && question && (
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="bg-white/10 rounded-full px-3 py-1">Question {room.currentIndex + 1} / {room.questionIds.length} · {categoryLabel(question.category)}</span>
            <span className={`rounded-full px-3 py-1 font-bold ${timeLeft <= 5 && room.status === 'question' ? 'bg-red-600' : 'bg-white/10'}`}>⏱️ {room.status === 'question' ? `${timeLeft}s` : 'Terminé'}</span>
            <span className="bg-white/10 rounded-full px-3 py-1">{answeredCount} / {room.players.length} réponses</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${(timeLeft / room.config.timerSec) * 100}%` }} /></div>

          {room.round.cursedBy && (
            <div className="bg-red-950 border-2 border-red-500 rounded-2xl p-3 text-center font-bold animate-pulse">
              ☠️ MALÉDICTION ACTIVE (lancée par {room.players.find((p) => p.id === room.round.cursedBy)?.name}) — Bonne réponse : 50 % des points · Mauvaise ou absente : −500 pts · pour TOUT LE MONDE
            </div>
          )}

          <div className="bg-[#1e1133] rounded-2xl p-4 sm:p-5">
            <h3 className="text-xl font-bold">{question.question}</h3>
            <MediaBlock q={question} isHost={isHost && !me} />
            {room.config.consensus && room.teams.length > 0 && room.status === 'question' && (
              <p className="text-sm text-white/50 mt-1">🗳️ Mode consensus : la réponse majoritaire de ton équipe comptera (égalité → capitaine).</p>
            )}

            {me && room.status === 'question' && !myAnswer && (
              <div className="flex flex-wrap gap-2 mt-4">
                <Btn color="bg-amber-600 hover:bg-amber-500" disabled={me.powers.double} onClick={() => usePower('double')}>✖️2 Double points{me.powers.double ? ' (utilisé)' : ''}</Btn>
                <Btn color="bg-sky-700 hover:bg-sky-600" disabled={me.powers.skip} onClick={() => usePower('skip')}>⏭️ Sauter{me.powers.skip ? ' (utilisé)' : ''}</Btn>
                <Btn color="bg-violet-700 hover:bg-violet-600" disabled={me.powers.fifty} onClick={() => usePower('fifty')}>½ 50/50{me.powers.fifty ? ' (utilisé)' : ''}</Btn>
                <Btn color="bg-red-800 hover:bg-red-700" disabled={me.powers.curse} onClick={() => usePower('curse')}>☠️ Malédiction{me.powers.curse ? ' (utilisée)' : ''}</Btn>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {question.choices.map((c, i) => {
                const hidden = hiddenByFifty.includes(i)
                const isCorrect = room.status === 'reveal' && i === question.correctIndex
                const isMine = myAnswer?.choice === i
                if (hidden && room.status === 'question') return <div key={i} className="rounded-xl p-4 bg-white/5 text-white/30 line-through">{LETTERS[i]}. {c} (éliminé par 50/50)</div>
                return (
                  <button key={i} disabled={!me || room.status !== 'question' || Boolean(myAnswer)}
                    onClick={() => answer(i)}
                    className={`text-left rounded-xl p-4 py-5 text-base w-full font-semibold transition ${isCorrect ? 'bg-emerald-600' : isMine ? 'bg-orange-600' : 'bg-white/10 hover:bg-white/20'} disabled:cursor-default`}>
                    {LETTERS[i]}. {c}{isMine ? ' ✓ (ta réponse)' : ''}{isCorrect ? ' ✅' : ''}
                  </button>
                )
              })}
            </div>

            {me && myAnswer && room.status === 'question' && <p className="mt-3 text-white/70">{myAnswer.skipped ? '⏭️ Question sautée — série conservée, 0 pt (même sous Malédiction).' : '🔒 Réponse enregistrée. En attente des autres…'}</p>}
            {!me && room.status === 'question' && <p className="mt-3 text-white/60">👀 Vue hôte : les joueurs répondent sur leur appareil.</p>}

            {room.status === 'reveal' && (
              <div className="mt-4 bg-black/30 rounded-xl p-4">
                <p className="font-bold text-emerald-300">Bonne réponse : {LETTERS[question.correctIndex]}. {question.choices[question.correctIndex]}</p>
                <p className="text-white/80 mt-1">{question.explanation}</p>
                {me && room.lastDetail[me.id] && (
                  <p className="mt-2 font-bold">Ton résultat : {room.lastDetail[me.id].delta >= 0 ? '+' : ''}{room.lastDetail[me.id].delta} pts ({room.lastDetail[me.id].outcome}{room.lastDetail[me.id].cursed ? ', sous Malédiction' : ''})</p>
                )}
              </div>
            )}
          </div>

          {room.status === 'reveal' && (
            <>
              <Leaderboard room={room} players={room.players} />
              {autoOn ? (
                <div className="bg-[#1e1133] rounded-2xl p-4">
                  <p className="font-bold text-center">
                    {room.currentIndex + 1 >= room.questionIds.length
                      ? `🏁 Podium final dans ${revealLeftSec}s…`
                      : `➡️ Question suivante dans ${revealLeftSec}s…`}
                  </p>
                  <div className="w-full bg-white/10 rounded-full h-2.5 mt-2 overflow-hidden">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${revealPct}%` }} />
                  </div>
                  {isHost && (
                    <div className="text-center mt-3">
                      <Btn onClick={nextQuestion}>
                        {room.currentIndex + 1 >= room.questionIds.length ? '🏁 Voir le podium maintenant' : '⏩ Passer maintenant'}
                      </Btn>
                    </div>
                  )}
                </div>
              ) : (
                isHost && <Btn onClick={nextQuestion}>{room.currentIndex + 1 >= room.questionIds.length ? '🏁 Voir le podium final' : '➡️ Question suivante'}</Btn>
              )}
            </>
          )}
          {room.status === 'question' && isHost && <Btn color="bg-white/20" onClick={doReveal}>Révéler maintenant</Btn>}
        </div>
      )}

      {room.status === 'finished' && (
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-center">🏆 Podium final</h3>
          <Leaderboard room={room} players={room.players} />
          <div className="text-center"><a href="./"><Btn>🎃 Nouvelle partie</Btn></a></div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const [view, setView] = useState(params.get('room') ? 'room' : 'home')
  const [role, setRole] = useState(params.get('room') ? 'player' : null)
  const [code, setCode] = useState((params.get('room') || '').toUpperCase())
  const [joinCode, setJoinCode] = useState('')

  async function createRoom(cfg) {
    const newCode = genCode()
    const teams = cfg.mode === 'solo' ? [] : Array.from({ length: cfg.teamCount }).map((_, i) => ({
      id: uid(), name: cfg.teamNames[i] || TEAM_PRESETS[i].name, color: TEAM_PRESETS[i].color,
    }))
    const room = emptyRoom(newCode, { ...cfg, teams })
    if (cfg.hostPlays && cfg.hostName.trim()) {
      const id = uid()
      room.players.push({ id, name: cfg.hostName.trim(), teamId: teams[0]?.id ?? null, score: 0, streak: 0, isCaptain: Boolean(teams[0]), isBot: false, powers: { double: false, skip: false, fifty: false, curse: false } })
      sessionStorage.setItem(`hq_me_${newCode}`, id)
    }
    await saveRoom(room)
    setCode(newCode)
    setRole('host')
    setView('room')
    window.history.replaceState(null, '', `?room=${newCode}`)
  }

  if (view === 'config') return <ConfigScreen onCreate={createRoom} onBack={() => setView('home')} />
  if (view === 'room' && code) return <RoomView code={code} role={role} setRole={setRole} />

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:p-6 text-center">
      <div className="text-7xl floaty">🎃</div>
      <h1 className="text-4xl font-black mt-2">Quiz Halloween</h1>
      <p className="text-white/70 mt-2">Culture générale d'Halloween pour résidents en <b>physiatrie</b> — multijoueur temps réel, pouvoirs spéciaux, modes solo et équipes.</p>
      <p className="text-sm text-white/40 mt-1">{ALL_QUESTIONS.length} questions de culture générale · Niveau ludique — environ une personne sur deux connaît la réponse</p>
      <div className="bg-[#1e1133] rounded-2xl p-5 mt-6 space-y-4">
        <Btn className="w-full" onClick={() => setView('config')}>🧙 Créer une partie (hôte)</Btn>
        <div className="flex flex-col sm:flex-row gap-2">
          <input value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} placeholder="Code de partie (6 caractères)" maxLength={6} className="flex-1 min-w-0 w-full bg-white/10 rounded-xl p-3 text-center tracking-widest" />
          <Btn color="bg-violet-600 hover:bg-violet-500" disabled={joinCode.length !== 6}
            onClick={() => { setCode(joinCode); setRole('player'); setView('room'); window.history.replaceState(null, '', `?room=${joinCode}`) }}>
            👻 Rejoindre
          </Btn>
        </div>
        <p className="text-xs text-white/40">{roomBackend === 'firestore' ? 'Mode en ligne : partage le lien ou le code du lobby — les joueurs rejoignent depuis leur propre téléphone.' : 'Astuce démo : crée la partie, puis « Ouvrir un onglet joueur » depuis le lobby pour tester à plusieurs sur le même appareil. Pour jouer à distance sur des téléphones différents, configure Firebase (voir le README).'}</p>
      </div>
    </div>
  )
}
