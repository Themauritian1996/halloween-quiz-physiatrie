import random, statistics as st
N=12; Q=30; T=45
def spearman(a,b):
    ra={v:i for i,v in enumerate(sorted(range(len(a)),key=lambda i:a[i]))}
    rb={v:i for i,v in enumerate(sorted(range(len(b)),key=lambda i:b[i]))}
    n=len(a); d=sum((ra[i]-rb[i])**2 for i in range(n)); return 1-6*d/(n*(n*n-1))
def game(v,rng):
    skill=[rng.uniform(0.30,0.70) for _ in range(N)]
    score=[0]*N; streak=[0]*N
    pw=[{'dbl':1,'skip':1,'ff':1,'curse':1} for _ in range(N)]
    curse_plan=[rng.randint(3,Q) for _ in range(N)]
    last_curse=-99; curses_used=0; zero_hits=0; neg_events=0; curses_n=0
    lead20=None
    for q in range(1,Q+1):
        diff=rng.gauss(0,0.12)
        know=[rng.random()<min(.95,max(.05,skill[i]-diff)) for i in range(N)]
        # malédiction
        cursed=None
        allowed = v['cooldown'] is None or q-last_curse>=v['cooldown']
        if v['max'] is not None and curses_used>=v['max']: allowed=False
        if allowed:
            cands=[i for i in range(N) if pw[i]['curse'] and q>=curse_plan[i] and know[i]]
            if cands:
                cursed=rng.choice(cands); pw[cursed]['curse']=0; last_curse=q; curses_used+=1; curses_n+=1
        for i in range(N):
            if cursed is not None and not know[i] and pw[i]['skip']:
                pw[i]['skip']=0; continue
            if cursed is None and not know[i] and pw[i]['skip'] and rng.random()<.04:
                pw[i]['skip']=0; continue
            p_ok=1.0 if know[i] else .25
            if not know[i] and pw[i]['ff'] and rng.random()<.25: pw[i]['ff']=0; p_ok=.5
            dbl = know[i] and pw[i]['dbl'] and rng.random()<.10
            if dbl: pw[i]['dbl']=0
            ok=rng.random()<p_ok
            t = rng.uniform(.15,.55) if know[i] else rng.uniform(.5,.95)
            if rng.random()<.04: ok=None  # absent
            d=0
            if ok:
                pts=round(500+500*(1-t))
                if dbl: pts*=2
                if cursed is not None: pts=round(pts*v['curse_mult'])
                if cursed is not None and v.get('caster_bonus') and i==cursed: pts=round(pts*2)
                d+=pts; streak[i]+=1
                if streak[i]%3==0: d+=150
            else:
                streak[i]=0
                if cursed is not None and not (v.get('caster_immune_other') and False):
                    if v['pen_kind']=='flat': d-=v['pen']
                    else: d-=round(score[i]*v['pen'])
                    neg_events+=1
            new=max(0,score[i]+d)
            if score[i]+d<0: zero_hits+=1
            score[i]=new
        if q==20: lead20=max(range(N),key=lambda i:score[i])
    win=max(range(N),key=lambda i:score[i])
    best=max(range(N),key=lambda i:skill[i])
    return dict(rho=spearman(skill,score),bestwin=win==best,flip=win!=lead20,
                zero=zero_hits,neg=neg_events,curses=curses_n,spread=max(score)-min(score),
                mean=st.mean(score))
V={
 'A. Actuel (−500, ½ pts, 12 malédictions)':dict(pen_kind='flat',pen=500,curse_mult=.5,cooldown=None,max=None),
 'B. −250 seulement':dict(pen_kind='flat',pen=250,curse_mult=.5,cooldown=None,max=None),
 'C. −250 + 1 malédiction / 4 q. max':dict(pen_kind='flat',pen=250,curse_mult=.5,cooldown=4,max=None),
 'D. Proportionnelle (−15 % du score, pts normaux)':dict(pen_kind='pct',pen=.15,curse_mult=1.0,cooldown=3,max=None),
 'E. D + lanceur ×2 s\'il a bon':dict(pen_kind='pct',pen=.15,curse_mult=1.0,cooldown=3,max=None,caster_bonus=True),
 'Z. Sans malédiction (référence)':dict(pen_kind='flat',pen=0,curse_mult=1,cooldown=None,max=0),
}
rng=random.Random(42)
print(f"{'Variante':48s} ρ mérite  Meilleur gagne  Renversement  Malédic.  Planchers 0  Écart final")
for k,v in V.items():
    R=[game(v,rng) for _ in range(2000)]
    print(f"{k:48s} {st.mean(r['rho'] for r in R):.2f}    {100*st.mean(r['bestwin'] for r in R):5.0f} %       {100*st.mean(r['flip'] for r in R):5.0f} %     {st.mean(r['curses'] for r in R):4.1f}     {st.mean(r['zero'] for r in R):5.1f}      {st.mean(r['spread'] for r in R):6.0f}")
