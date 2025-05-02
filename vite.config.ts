import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Easy_crm/',
  build: {
    outDir: 'public',
  },
  server: {
    watch: {
      ignored: ['**/crmData.json'],
    },
  },
});
