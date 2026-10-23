// Résolution des URL de médias de la banque.
//
// Les JSON stockent les chemins en absolu racine : "/media/xxx.svg".
// Utilisés tels quels, ils cassent dès que le site n'est pas servi à la
// racine du domaine : sur GitHub Pages, le site vit sous
// "/halloween-quiz-physiatrie/", donc "/media/xxx" partait en 404 alors
// que le fichier est bien déployé dans "<base>/media/xxx".
//
// Ce helper est le SEUL point de passage : il préfixe tout chemin local
// par import.meta.env.BASE_URL (la base Vite du build : "./" en local et
// par défaut, "/<repo>/" sur Pages, "/" sur Firebase Hosting).
//
// Lot 10 : une partie des médias sont EXTERNES (media.external = true) —
// aperçus audio iTunes, affiches TVmaze/Wikipédia. Leur src est une URL
// absolue pointant directement sur le FICHIER (jamais une page) : ce
// helper les laisse passer inchangées, comme prévu ci-dessous.
export function mediaUrl(src) {
  if (!src) return src
  // URLs déjà absolues (http, data:, blob:) : on ne touche à rien.
  if (/^(https?:|data:|blob:)/i.test(src)) return src
  const base = import.meta.env.BASE_URL || './'
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  const cleanSrc = String(src).replace(/^\.?\//, '')
  return `${cleanBase}${cleanSrc}`
}
