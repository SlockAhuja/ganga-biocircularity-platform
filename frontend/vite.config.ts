import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages under /ganga-biocircularity-platform/ or custom root
const basePath = process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS || process.env.GITHUB_PAGES ? '/ganga-biocircularity-platform/' : '/');

export default defineConfig({
  plugins: [react()],
  base: basePath,
  server: {
    port: 5173,
    host: true
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gis': ['leaflet', 'react-leaflet'],
          'vendor-charts': ['recharts'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
});
