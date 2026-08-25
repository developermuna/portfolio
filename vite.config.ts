import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const serviceId = env.VITE_EMAILJS_SERVICE_ID || env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID || '';
  const templateId = env.VITE_EMAILJS_TEMPLATE_ID || env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID || '';
  const publicKey = env.VITE_EMAILJS_PUBLIC_KEY || env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY || '';

  return {
    envPrefix: ['VITE_', 'EMAILJS_'],
    define: {
      'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(serviceId),
      'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(templateId),
      'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(publicKey),
      'import.meta.env.EMAILJS_SERVICE_ID': JSON.stringify(serviceId),
      'import.meta.env.EMAILJS_TEMPLATE_ID': JSON.stringify(templateId),
      'import.meta.env.EMAILJS_PUBLIC_KEY': JSON.stringify(publicKey),
    },
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
          maximumFileSizeToCacheInBytes: 5000000, // Increase cache size limit to 5MB for assets
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/pub-300810ae570e4983a2a928a706ef0133\.r2\.dev\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'r2-images-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
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
  };
});
