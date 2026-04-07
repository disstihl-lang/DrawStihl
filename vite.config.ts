import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build' || mode === 'production'

  return {
    base: isProduction ? '/DrawStihl/' : '/',
    plugins: [react()],
  }
})
