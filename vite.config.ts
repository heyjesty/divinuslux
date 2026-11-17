import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('gsap') || id.includes('lenis')) return 'scroll';
          if (id.includes('react')) return 'react';
          return 'vendor';
        },
      },
    },
  },
  ssr: { noExternal: ['react-helmet-async', 'gsap', 'lenis', 'framer-motion'] },
});
