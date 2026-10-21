import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path CONFIGURABLE (variable d'environnement VITE_BASE_PATH au build) :
// - en local et en démo : './' (défaut, fonctionne partout, même en sous-dossier)
// - sur GitHub Pages (site de projet) : '/<nom-du-repo>/' — le workflow
//   .github/workflows/deploy-pages.yml le calcule automatiquement.
// - sur Firebase Hosting (racine du domaine) : '/' convient aussi.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react(), tailwindcss()],
})
