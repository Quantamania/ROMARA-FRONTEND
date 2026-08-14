import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      // The manifest already exists as a static file, so let it stay the source
      // of truth rather than having the plugin emit a competing one.
      manifest: false,
      includeAssets: ['logoicon.png', 'icons/*.png'],
      workbox: {
        // The app shell. Anything not matched below falls back to index.html,
        // which is what lets a hard refresh work offline on a client-routed SPA.
        globPatterns: ['**/*.{js,css,html,woff2}'],
        navigateFallback: '/index.html',
        // The admin panel is useless offline — it only ever shows live data —
        // and caching it would bloat every visitor's cache for nothing.
        navigateFallbackDenylist: [/^\/admin/],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Photography is the bulk of this site's weight and rarely changes.
            urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'romara-images',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'romara-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Tours, blog posts and testimonials: show the last known copy
            // instantly, then refresh in the background. Stale content beats an
            // error page when someone is on a weak connection in the bush.
            urlPattern: /\/rest\/v1\/(tour_packages|blog_posts|testimonials)/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'romara-content',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Never cache anything that moves money or takes a submission —
            // a replayed payment or a silently-cached booking would be worse
            // than an honest failure.
            urlPattern: /\/(functions\/v1|rest\/v1\/(payments|bookings|enquiries|booking_requests|transfer_bookings|vehicle_hire_requests))/,
            handler: 'NetworkOnly',
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
