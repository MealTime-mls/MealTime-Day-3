import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages expects an index.html in the root directory
  // so just run npm build before pushing to GitHub and this will rebuild our assets to the root
  build: { outDir: '..' },
  base: '/MealTime-Day-2/', // needed for github pages just put the repo name here
  emptyOutDir: true, // this will clear the dist folder before rebuilding
});