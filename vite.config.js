import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
           target: 'http://localhost:3000',
           changeOrigin: true,
           secure: false,      
           ws: true,
           rewrite: path => path.replace('/api', '')
       }
    },
    port: 8080,
    open: true,
    origin: 'http://localhost:3000'
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx"
    },
  },
  plugins: [react()],
})
