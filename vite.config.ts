import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: "Muna's Portfolio",
        short_name: 'Muna',
        description: 'A full-stack developer portfolio.',
        theme_color: '#0C0C0C',
        background_color: '#0C0C0C',
        display: 'standalone',
        icons: [
          {
            src: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000 // Increase cache size limit to 5MB for assets
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-framer-motion';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('lucide-react')) return 'vendor-icons';
            return 'vendor';
          }
        },
      },
    },
  },
});
