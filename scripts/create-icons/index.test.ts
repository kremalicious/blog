import { afterAll, test } from 'vitest'
import fs from 'fs/promises'
import path from 'path'
import { generateIcons } from './index'

const distDir = path.resolve(__dirname, 'tmp')

afterAll(() => {
  fs.rm(path.resolve(__dirname, 'tmp'), { recursive: true })
})

test('should generate Astro components from SVG files', async () => {
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

  // Assert: Check if an example Astro component exists
  const exampleComponentPath = path.join(distDir, 'Bitcoin.astro')
  try {
    await fs.stat(exampleComponentPath)
  } catch (err) {
    throw new Error(
      `Example Astro component does not exist: ${exampleComponentPath}`
    )
  }
})
