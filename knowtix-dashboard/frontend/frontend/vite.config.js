import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for KNOWTIX GitHub Pages deployment
export default defineConfig({
  base: '/Knowtix-dashboard-123/',

  plugins: [
    react()
  ],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true
  },

  server: {
    host: 'localhost',
    port: 5173,
    open: true
  }
});
