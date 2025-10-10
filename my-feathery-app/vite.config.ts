// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'globalThis', // optional shim
  },
});
