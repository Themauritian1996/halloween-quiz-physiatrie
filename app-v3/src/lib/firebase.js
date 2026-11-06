// Configuration Firebase OPTIONNELLE.
// Le jeu est 100 % jouable sans Firebase grâce au MODE DÉMO LOCAL
// (voir lib/room.js : localStorage + BroadcastChannel entre onglets).
// Pour jouer à distance sur des appareils différents, renseignez les
// variables VITE_FIREBASE_* dans un fichier .env (voir .env.example).
// Dès qu'elles sont présentes, le store de partie (lib/room.js) bascule
// automatiquement sur Firestore (collection `rooms/{code}`, onSnapshot) ;
// sinon il reste en mode démo local. Déployez aussi `firestore.rules`
// (à la racine du projet) — procédure complète dans le README.
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(cfg.apiKey && cfg.projectId && cfg.appId)

let db = null
if (isFirebaseConfigured) {
  db = getFirestore(initializeApp(cfg))
}
export { db }
