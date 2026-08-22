import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/webhook': {
        target: 'http://127.0.0.1:5001/la-crmtest/asia-southeast2/whatsappai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webhook/, '')
      }
    }
  }
});