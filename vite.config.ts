import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path')

const atImport = require('postcss-import')
const config = require('./package.json')

const { resolve } = path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";@import "@/sites/assets/styles/variables.scss";`,
      },
      postcss: {
        plugins: [atImport({ path: path.join(__dirname, 'src`') })],
      },
    },
  },
  build: {
    target: 'es2015',
    outDir: './dist/1x/',
    cssCodeSplit: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: `index-${config.version}/[name].js`,
        chunkFileNames: `index-${config.version}/[name].js`,
        assetFileNames: `index-${config.version}/[name].[ext]`,
      },
    },
  },
})
