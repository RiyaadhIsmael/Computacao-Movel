import os
import subprocess

# Define project name
project_name = 'vue-pwa-demo'

project_directory = "C:/Users/iamri/OneDrive/Desktop/CM"

# Create Vue project directory
os.makedirs(project_directory, exist_ok=True)
os.chdir(project_directory)

try:
    print(f"Running Vue CLI in: {os.getcwd()}")
    subprocess.run(['vue', 'create', '.', '--default', '--no-git'], check=True)
except Exception as e:
    print(f"Error running command: {e}")

# Change to the directory where the Vue project will be created
os.chdir(project_directory)

# Step 1: Initialize a new Vue.js project
subprocess.run(['vue', 'create', '.', '--default', '--no-git'], check=True)

# Step 2: Add PWA support via Vue CLI Plugin PWA
subprocess.run(['vue', 'add', 'pwa'], check=True)

# Step 3: Modify vue.config.js for PWA offline configuration
vue_config = '''const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pwa: {
    name: 'Vue PWA Demo',
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
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: '/index.html',
    }
  }
})
'''

# Create vue.config.js
with open('vue.config.js', 'w') as f:
    f.write(vue_config)

# Step 4: Modify the default Vue app to be more simple
app_vue = '''<template>
  <div id="app">
    <h1>Welcome to Your PWA App!</h1>
    <p>This app works offline thanks to the service worker.</p>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
'''

# Replace App.vue content with a simple template
with open('src/App.vue', 'w') as f:
    f.write(app_vue)

# Step 5: Build and serve the project for the first time
subprocess.run(['npm', 'install'], check=True)
subprocess.run(['npm', 'run', 'build'], check=True)

# Step 6: Use 'serve' to serve the build (this is necessary for testing the PWA offline)
subprocess.run(['npm', 'install', '-g', 'serve'], check=True)
subprocess.run(['serve', '-s', 'dist'], check=True)

print(f"Your Vue PWA is ready and running! Visit http://localhost:5000")
