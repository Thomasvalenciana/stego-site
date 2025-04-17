import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Puts the build output in /web/dist
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      // Optional: allows proxying backend requests during local dev
      '/submit': 'http://localhost:5000',
      '/extract': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
      '/files': 'http://localhost:5000',
      '/list-uploads': 'http://localhost:5000',
    },
  },
})
