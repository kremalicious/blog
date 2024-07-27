import fs from 'node:fs/promises'
import path from 'node:path'
import { test } from 'vitest'
import { generateIcons } from './index'

const distDir = path.resolve(__dirname, 'tmp')

test('should generate Astro & React components from SVG files', async () => {
  // Act
  await generateIcons(distDir)

  // Assert: Check if the distribution directory exists
  try {
    await fs.stat(distDir)
  } catch (err) {
    throw new Error(`Distribution directory does not exist: ${distDir}`)
  }

  // Assert: Check if Props.d.ts exists
  try {
    await fs.stat(path.join(distDir, 'Props.d.ts'))
  } catch (err) {
    throw new Error('Props.d.ts does not exist')
  }

  // Assert: Check if an example Astro & React component exists
  const exampleComponentPathAstro = path.join(distDir, 'Bitcoin.astro')
  const exampleComponentPathReact = path.join(distDir, 'react', 'Bitcoin.tsx')
  try {
    await fs.stat(exampleComponentPathAstro)
  } catch (err) {
    throw new Error(
      `Example Astro component does not exist: ${exampleComponentPathAstro}`
    )
  }

  try {
    await fs.stat(exampleComponentPathReact)
  } catch (err) {
    throw new Error(
      `Example React component does not exist: ${exampleComponentPathReact}`
    )
  }

  // cleanup
  await fs.rm(distDir, { recursive: true, force: true })
})
