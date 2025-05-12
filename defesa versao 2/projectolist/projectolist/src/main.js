import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

createApp(App).mount('#app')
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js') // Caminho para o seu service worker
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Falha ao registrar o Service Worker:', error);
        });
    });
  }
  