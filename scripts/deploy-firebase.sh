#!/usr/bin/env bash
# Déploiement alternatif sur Firebase Hosting (+ règles Firestore).
# Alternative au déploiement GitHub Pages du workflow Actions.
#
# Prérequis (voir README, section « Mise en ligne ») :
#   1. npm install -g firebase-tools   puis   firebase login
#   2. Avoir créé le projet Firebase + activé Firestore
#   3. cp .firebaserc.example .firebaserc  et y mettre l'ID du projet
#      (.firebaserc est gitignoré : jamais commité)
#   4. app/.env rempli avec les VITE_FIREBASE_* (gitignoré aussi)
#
# Usage :  bash scripts/deploy-firebase.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .firebaserc ]; then
  echo "❌ .firebaserc manquant : cp .firebaserc.example .firebaserc puis mets l'ID de ton projet Firebase." >&2
  exit 1
fi
command -v firebase >/dev/null || { echo "❌ firebase-tools introuvable : npm install -g firebase-tools" >&2; exit 1; }

echo "▶ Build de l'app (base path racine pour Firebase Hosting)…"
(cd app && npm install && VITE_BASE_PATH=/ npm run build)

echo "▶ Déploiement Hosting + règles Firestore…"
firebase deploy --only hosting,firestore:rules

echo "✅ Déployé. Pense aussi à tester une partie entre deux appareils différents !"
