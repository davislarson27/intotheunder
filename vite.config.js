import { defineConfig } from 'vite';

const port = '3000';

export default defineConfig({
  server: {
    proxy: { // use 4000 for live server, 3000 for local testing
      '/api': `http://localhost:${port}`,
      '/ws': {
        target: `ws://localhost:${port}`,
        ws: true,
      },
    },
    
  },
});