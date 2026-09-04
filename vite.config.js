import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3002,
    proxy: {
      '/api/search': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/topics': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
});
