import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'
import { globby } from 'globby'
import type { Ora } from 'ora'
import { expect, test, vi } from 'vitest'
import { copyZipFiles } from './move-downloads'

vi.mock('globby', () => ({
  globby: vi.fn().mockResolvedValue(['file1.zip', 'file2.zip'])
}))

vi.mock('ora', () => ({
  default: vi.fn(() => ({
    start: () => ({
      text: '',
      start: vi.fn(),
      succeed: vi.fn(),
      fail: vi.fn()
    })
  }))
}))

test('copyZipFiles should copy zip files', async () => {
  // Create temporary directories and files
  const sourceDir = path.join(__dirname, 'tmp_source')
  const destDir = path.join(__dirname, 'tmp_dest')
  await fs.mkdir(sourceDir, { recursive: true })
  await fs.mkdir(destDir, { recursive: true })
  await fs.writeFile(path.join(sourceDir, 'file1.zip'), 'content1')
  await fs.writeFile(path.join(sourceDir, 'file2.zip'), 'content2')
  // Add an existing file to destDir to test removal
  await fs.writeFile(path.join(destDir, 'old.zip'), 'old content')
  // Add a subdirectory with a file to test recursive removal
  await fs.mkdir(path.join(destDir, 'subdir'), { recursive: true })
  await fs.writeFile(path.join(destDir, 'subdir', 'old2.zip'), 'old content2')

  const mockOra = {
    text: '',
    start: vi.fn(),
    succeed: vi.fn(),
    fail: vi.fn()
  }

  await copyZipFiles(sourceDir, destDir, mockOra as unknown as Ora)

  const file1 = await fs.readFile(path.join(destDir, 'file1.zip'), 'utf-8')
  const file2 = await fs.readFile(path.join(destDir, 'file2.zip'), 'utf-8')
  expect(file1).toBe('content1')
  expect(file2).toBe('content2')
  // Check that old file was removed
  await expect(fs.access(path.join(destDir, 'old.zip'))).rejects.toThrow()
  // Check that subdirectory was removed
  await expect(fs.access(path.join(destDir, 'subdir'))).rejects.toThrow()

  expect(mockOra.succeed).toHaveBeenCalledWith(
    `${chalk.bold('[move-downloads]')} Copied 2 .zip files to ${destDir}`
  )

  // Cleanup
  await fs.rm(sourceDir, { recursive: true, force: true })
  await fs.rm(destDir, { recursive: true, force: true })
})

test('copyZipFiles should create destination folder if it does not exist', async () => {
  // Create temporary directories and files
  const sourceDir = path.join(__dirname, 'tmp_source2')
  const destDir = path.join(__dirname, 'tmp_dest2')
  await fs.mkdir(sourceDir, { recursive: true })
  await fs.writeFile(path.join(sourceDir, 'file1.zip'), 'content1')

  const globbyMock = vi.mocked(globby)
  globbyMock.mockResolvedValue(['file1.zip'])

  const mockOra = {
    text: '',
    start: vi.fn(),
    succeed: vi.fn(),
    fail: vi.fn()
  }

  await copyZipFiles(sourceDir, destDir, mockOra as unknown as Ora)

  const file1 = await fs.readFile(path.join(destDir, 'file1.zip'), 'utf-8')
  expect(file1).toBe('content1')

  expect(mockOra.succeed).toHaveBeenCalledWith(
    `${chalk.bold('[move-downloads]')} Copied 1 .zip files to ${destDir}`
  )

  // Cleanup
  await fs.rm(sourceDir, { recursive: true, force: true })
  await fs.rm(destDir, { recursive: true, force: true })
})
