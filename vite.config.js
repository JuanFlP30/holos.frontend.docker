import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html', // Ruta al archivo index.html
        auth: './auth.html',  // Ruta al archivo auth.html
      },
    },
  },
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@Components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@Controllers': fileURLToPath(new URL('./src/controllers', import.meta.url)),
      '@Holos': fileURLToPath(new URL('./src/components/Holos', import.meta.url)),
      '@Layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@Lang': fileURLToPath(new URL('./src/lang', import.meta.url)),
      '@Router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@Pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@Plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
      '@Shared': fileURLToPath(new URL('./src/components/Shared', import.meta.url)),
      '@Services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@Stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
    }
  }
})
