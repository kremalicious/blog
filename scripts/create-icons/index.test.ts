import fs from 'node:fs/promises'
import path from 'node:path'
import { test } from 'vitest'
import { generateIcons } from './index'

const distDir = path.resolve(__dirname, 'tmp')

test('should generate React components from SVG files', async () => {
  // Act
  await generateIcons(distDir)

  // Assert: Check if the distribution directory exists
  try {
    await fs.stat(distDir)
  } catch (_err) {
    throw new Error(`Distribution directory does not exist: ${distDir}`)
  }

  // Assert: Check if Props.d.ts exists
  try {
    await fs.stat(path.join(distDir, 'Props.d.ts'))
  } catch (_err) {
    throw new Error('Props.d.ts does not exist')
  }

  // Assert: Check if Props.d.ts exists in react directory
  try {
    await fs.stat(path.join(distDir, 'react', 'Props.d.ts'))
  } catch (_err) {
    throw new Error('React Props.d.ts does not exist')
  }

  // Assert: Check if an example React component exists
  const exampleComponentPathReact = path.join(distDir, 'react', 'Bitcoin.tsx')
  try {
    await fs.stat(exampleComponentPathReact)
  } catch (_err) {
    throw new Error(
      `Example React component does not exist: ${exampleComponentPathReact}`
    )
  }

  // Assert: Check if the index files exist
  try {
    await fs.stat(path.join(distDir, 'index.ts'))
  } catch (_err) {
    throw new Error('Main index.ts does not exist')
  }

  try {
    await fs.stat(path.join(distDir, 'react', 'index.ts'))
  } catch (_err) {
    throw new Error('React index.ts does not exist')
  }

  // cleanup
  await fs.rm(distDir, { recursive: true, force: true })
}, 15000)
