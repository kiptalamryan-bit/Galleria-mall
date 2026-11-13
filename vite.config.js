import {reolve} from 'path';
import{defineConfig} from 'vite';

export default defineConfig({
  base: '/Galleria-mall/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist')
  },
  server: {
    port: 8080
  },

  css: {
    preprocessorOptions: {
      scss:{
        silenceDeprecations:[
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin,'
        ],
      },

    },
  },
})