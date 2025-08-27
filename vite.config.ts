import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cloudstall-website/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'aos'],
          icons: ['lucide-react']
        }
      }
    },
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    reportCompressedSize: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  },
  server: {
    port: 5173,
    host: true
  }
})
