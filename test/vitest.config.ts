/// <reference types="vitest" />

import path from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      'astro:content': path.resolve(__dirname, './__mocks__/astro-content.ts'),
      'astro:assets': path.resolve(__dirname, './__mocks__/astro-assets.ts')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./test/vitest.setup.ts'],
    include: [
      './src/**/*.test.?(c|m)[jt]s?(x)',
      './scripts/**/*.test.?(c|m)[jt]s?(x)'
    ],
    deps: {
      moduleDirectories: ['node_modules', './test/__mocks__']
    },
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: [
        '**/*.d.ts',
        '**/types.ts',
        '**/*.test.*',
        '**/*.spec.*',
        '**/test/**/*',
        '**/*.astro',
        '**/config',
        'src/pages',
        '**/content',
        'public',
        '**/tmp/**/*',
        '**/dist/**/*',
        '**/schemas/**/*',
        '**/types/**/*',
        '**/index.ts', // assuming they are barrel files,
        'src/content.config.ts',
        '**/*.css'
      ]
    }
  }
})
