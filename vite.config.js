import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Grupp1-Recipe-app/',
  plugins: [react()],
})
