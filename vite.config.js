import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // use 4000 for live server, 3000 for local testing
    },
  },
});