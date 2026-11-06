# Aide de rédaction pour la banque v3.
# q(difficulte, question, bonne_reponse, [3 mauvaises], explication, p=physiatrie, m=id média v2 réutilisé)
#   difficulte : 'i' (intermédiaire) ou 'd' (difficile)
#   m : identifiant d'une question v2 dont on réutilise le FICHIER média déjà
#       sourcé et vérifié (licence, anti-fuite). Le texte de la question est neuf.
Q = []


def q(d, question, bonne, mauvaises, explication, p=False, m=None):
    assert d in ('i', 'd'), d
    assert len(mauvaises) == 3, question
    Q.append(dict(d=d, question=question, bonne=bonne, mauvaises=list(mauvaises),
                  explication=explication, physiatrie=p, media_ref=m))
