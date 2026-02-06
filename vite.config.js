import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use base path for production (GitHub Pages), but not for development
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/club7fitness/' : '/',
  server: {
    port: 3000,
    open: true
  }
})

