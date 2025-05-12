const { defineConfig } = require('@vue/cli-service')
module.exports = {
  pwa: {
    name: 'Meu App',
    themeColor: '#4DBA87', // Cor de tema
    msTileColor: '#000000', // Cor do tile no Windows (opcional)
    appleMobileWebAppStatusBarStyle: 'black-translucent', // Estilo da barra de status no iOS (opcional)
    manifestOptions: {
      background_color: '#ffffff', // Cor de fundo para o PWA
      icons: [
        {
          src: 'img/icons/android-chrome-192x192.png', // Use um ícone padrão se não tiver um
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'img/icons/android-chrome-512x512.png', // Use um ícone padrão se não tiver um
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workboxOptions: {
      skipWaiting: true, // Faz o PWA esperar um serviço mais recente
      clientsClaim: true, // Garante que o PWA seja controlado imediatamente
    },
  },
}

