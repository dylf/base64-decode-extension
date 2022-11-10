import { resolve } from 'path'
import { defineConfig } from 'vite'
import { chromeExtension } from 'vite-plugin-chrome-extension'

export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: 'src/manifest.json',
    },
  },
  // @ts-expect-error
  plugins: [chromeExtension()],
})
