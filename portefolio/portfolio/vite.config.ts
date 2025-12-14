import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@pages': path.resolve(__dirname, './src/pages'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Manual chunking for better caching and parallel loading
        manualChunks: {
          // React core libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI and animation libraries
          'ui-vendor': ['framer-motion', 'react-icons'],
          // Internationalization libraries
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          // EmailJS for contact form
          'email-vendor': ['@emailjs/browser']
        }
      }
    },
    // Increase chunk size warning limit (optimized chunks may be larger)
    chunkSizeWarningLimit: 600,
    // Source maps for production debugging (disable if not needed)
    sourcemap: false
  }
})
