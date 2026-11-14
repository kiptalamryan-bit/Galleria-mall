// ============================================================
// Vite configuration for Galleria Mall
// ============================================================

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Root directory for the Vite build.
  // `src/` contains the SPA entry (index.html), JS, and SCSS,
  // so `src/index.html` is the entry automatically resolved by
  // Vite at the project root.
  root: path.resolve(__dirname, 'src'),

  // Build output settings.
  build: {
    // Where the compiled output is written (relative to root).
    // `src` is root, so `../dist` resolves to the project's `dist/`.
    outDir: '../dist',

    // Folder Vite copies to dist/ as-is (images, videos, fonts, etc.)
    assetsDir: 'assets',

    // Keep sourcemaps for easier debugging of the deployed site.
    sourcemap: true,

    // Empty the outDir before each build so the dist/ folder is always
    // in a clean state (no stale files from previous builds).
    emptyOutdir: true,

    // `src/index.html` is the SPA entry; Vite processes it and
    // generates the HTML + asset manifest automatically.
    // With root set to `src/`, Vite treats index.html in root
    // as the entry, so the output lands at dist/index.html
    // (github-pages-friendly).
  },

  // Base URL for the deployed site.
  // GitHub Pages serves the repo root, so '/' works for this repo.
  // If you ever serve from a subpath (e.g. a GitHub Pages custom
  // domain at /galleria/), change this to '/galleria/'.
  base: '/',

  // CSS-related options.
  css: {
    // Pre-processor options.
    // `sass` is listed in devDependencies (^1.108.2), so
    // styles.scss can be compiled without extra setup.
    preprocessorOptions: {
      scss: {
        // Allow importing SCSS partials from node_modules
        // (e.g. bootstrap, vanilla-calendar-pro)
        silenceDeprecations: ['mixed-decls', 'color-function', 'global-var-list'],
      },
    },
  },

  // Resolver aliases.
  resolve: {
    // Ensure '@/' imports resolve to 'src/'
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // Server / dev options (used by `npm run dev`).
  server: {
    // Port for `npm run dev`
    port: 3000,
    open: false,
  },
});





