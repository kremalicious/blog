/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default getViteConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/vitest.setup.ts'],
    include: ['./src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    deps: {
      moduleDirectories: ['node_modules', './test/__mocks__']
    }
  }
})
