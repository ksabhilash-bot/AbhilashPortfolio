import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server: {
    base: '/AbhilashPortfolio/', 
    host: '0.0.0.0',
    port:5173
  },
  plugins: [react(),tailwindcss()],
})
