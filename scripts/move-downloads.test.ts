import { test, expect, vi } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { glob } from 'glob'
import { copyZipFiles } from './move-downloads'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

test('copyZipFiles should copy zip files', async () => {
  // Create temporary directories and files
  const sourceDir = path.join(__dirname, 'tmp_source')
  const destDir = path.join(__dirname, 'tmp_dest')
  await fs.mkdir(sourceDir, { recursive: true })
  await fs.mkdir(destDir, { recursive: true })
  await fs.writeFile(path.join(sourceDir, 'file1.zip'), 'content1')
  await fs.writeFile(path.join(sourceDir, 'file2.zip'), 'content2')

  const globMock = vi.spyOn(glob, 'sync')
  globMock.mockReturnValue(['file1.zip', 'file2.zip'])

  const mockOra = {
    start: vi.fn(),
    succeed: vi.fn(),
    fail: vi.fn()
  }

  copyZipFiles(sourceDir, destDir, mockOra as any)

  const file1 = await fs.readFile(path.join(destDir, 'file1.zip'), 'utf-8')
  const file2 = await fs.readFile(path.join(destDir, 'file2.zip'), 'utf-8')
  expect(file1).toBe('content1')
  expect(file2).toBe('content2')

  expect(mockOra.succeed).toHaveBeenCalledWith(
    `${chalk.bold('[move-downloads]')} Copied 2 .zip files to ${destDir}`
  )

  // Cleanup
  await fs.rm(sourceDir, { recursive: true, force: true })
  await fs.rm(destDir, { recursive: true, force: true })
})
