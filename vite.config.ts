import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Only use GitHub Pages base path when explicitly building for deployment
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';
  const basePath = isGitHubPages ? '/abc-giganten/' : '/';
  
  return {
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['**/*'],
      manifest: {
        name: 'ABC Giganten - Deutsch Alphabet Lernen',
        short_name: 'ABC Giganten',
        description: 'Interaktives Lernspiel für das deutsche Alphabet - perfekt für Vorschulkinder!',
        theme_color: '#2563eb',
        background_color: '#dbeafe',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: basePath,
        start_url: basePath,
        lang: 'de',
        dir: 'ltr',
        categories: ['education', 'games', 'kids'],
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        prefer_related_applications: false
      },
      workbox: {
        globPatterns: ['**/*'],
      },
      devOptions: {
        enabled: false // Disabled in dev to avoid issues
      }
    })
  ],
  base: basePath,
  server: {
    port: 3000,
    host: true, // Allow external connections
  },
  preview: {
    port: 4173,
    host: true, // Allow external connections for mobile testing
  },
  build: {
    outDir: 'dist',
  },
}});