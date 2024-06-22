/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default getViteConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/vitest.setup.ts'],
    include: [
      './src/**/*.test.?(c|m)[jt]s?(x)',
      './scripts/**/*.test.?(c|m)[jt]s?(x)'
    ],
    deps: {
      moduleDirectories: [
        'node_modules',
        './test/__mocks__',
        './src/images/components/react'
      ]
    },
    coverage: {
      all: true,
      exclude: [
        '**/*.d.ts',
        '**/types.ts',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/test/**/*',
        '**/.config',
        'src/images/components',
        'src/pages',
        '**/content',
        'public',
        '**/tmp/**/*'
      ]
    }
  }
})
