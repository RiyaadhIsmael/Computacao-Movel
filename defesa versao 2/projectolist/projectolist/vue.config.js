const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pwa: {
    name: 'Meu App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      background_color: '#ffffff',
      icons: [
        {
          src: 'img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    // ✅ Key part for offline support
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: '/index.html',
      navigateFallbackAllowlist: [/^\/.*/], // Allow all routes
      runtimeCaching: [
        {
          urlPattern: /\.(?:html|css|js|json|woff2?|ttf|png|jpg|jpeg|svg|gif|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets-cache',
            expiration: {
              maxEntries: 100, // Limit cache size to 100 entries
              maxAgeSeconds: 24 * 60 * 60, // Cache for 24 hours
            },
          },
        },
      ],
    }
  }
})
