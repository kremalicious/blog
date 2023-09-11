import { test, expect, vi } from 'vitest'
import fs from 'node:fs/promises'
import { Stats } from 'node:fs'
import { findMarkdownFilesWithRedirects } from './redirect-from'

test('findMarkdownFilesWithRedirects should generate correct redirects', async () => {
  const readdirMock = vi.spyOn(fs, 'readdir')
  readdirMock.mockResolvedValue(['post1.md', 'post2.md'] as any)

  const statMock = vi.spyOn(fs, 'stat')
  statMock.mockResolvedValue({ isFile: () => true } as Stats)

  const readFileMock = vi.spyOn(fs, 'readFile')
  readFileMock.mockResolvedValueOnce(
    '---\nredirect_from: ["/old1", "/old2"]\nslug: /new1\n---'
  )
  readFileMock.mockResolvedValueOnce(
    '---\nredirect_from: ["/old3"]\nslug: /new2\n---'
  )

  // Mock fs.writeFile to do nothing
  const writeFileMock = vi.spyOn(fs, 'writeFile')
  writeFileMock.mockResolvedValue()

  const redirects = await findMarkdownFilesWithRedirects('some/dir')

  expect(redirects).toEqual({
    '/old1': '/new1',
    '/old2': '/new1',
    '/old3': '/new2'
  })
})
