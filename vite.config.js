import { resolve } from 'path';

export default {
  root: resolve(__dirname, '.'),

  // Change the base path to your repository name
  base: '/Galleria-mall/',

  build: {
    outDir: 'dist'
  },

  server: {
    port: 8080
  }
};