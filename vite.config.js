import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: { // use 4000 for live server, 3000 for local testing
      '/api': 'http://localhost:3000',
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
    
  },
});