import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_'); // load only VITE_ variables

  return {
    plugins: [react()],
    define: {
      // Environment variables are automatically injected by Vite
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 5173,
    },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 4173,
      allowedHosts: ['nafshub.onrender.com'],
    },
    optimizeDeps: {
      include: [
        'chart.js',
        'chart.js/auto',
        'date-fns',
        'react-chartjs-2',
        'generative-ai' // ✅ only browser-compatible modules
      ]
    },
    build: {
      rollupOptions: {
        external: [],
        output: {
          manualChunks: {
            vendor: ['@google/generative-ai']
          }
        }
      }
    }
  };
});
