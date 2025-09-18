import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Ora } from 'ora'
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest'
import type { ImageMetadataFormatted } from '@/features/posts/types'
import { createArticlePost } from './create-article'
import { createPhotoPost } from './create-photo'
import { parsePhotoArgs } from './parse-photo-args'

// Mock the readImageMetadata function
const mockExifFormatted: ImageMetadataFormatted = {
  exif: {
    date: '2023-08-23T19:38:39.000+02:00'
  },
  iptc: {
    title: 'Test title',
    caption: 'Beach cliffs',
    keywords: ['portugal', 'sand']
  }
}

vi.mock('../../src/features/posts/lib/exif/read-image-metadata.js', () => ({
  readImageMetadata: vi.fn().mockImplementation(() => mockExifFormatted)
}))

const destFolder = path.join('.', 'test/__fixtures__/tmp')

// Helper to normalize content for comparison
function normalizeContent(content: string): string {
  return content
    .trim()
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\n+/g, '\n') // Remove multiple line breaks
    .replace(/\s+$/gm, '') // Remove trailing whitespace
}

describe('bun run new', () => {
  beforeEach(async () => {
    await fs.mkdir(destFolder, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(destFolder, { recursive: true })
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  // Mock spinner
  const spinner = {
    text: '',
    succeed: (text: string) => {
      spinner.text = text
    },
    fail: (text: string) => {
      spinner.text = text
    }
  } as Ora

  test('createArticlePost should create a new article post', async () => {
    const fixturePath = path.join('.', 'test/__fixtures__/new-article.md')

    const title = 'Hello Test'
    const date = '2023-09-10'
    const file = await createArticlePost(destFolder, spinner, title, date)
    expect(file).toBeDefined()
    expect(spinner.text).toContain(`New post 'Hello Test' created.`)

    // Verify that the article post was created
    const fileExists =
      file &&
      (await fs
        .access(file)
        .then(() => true)
        .catch(() => false))

    expect(fileExists).toBe(true)

    // Compare the generated index.md with the fixture new-article.md
    const generatedContent = file && (await fs.readFile(file, 'utf8'))
    const fixtureContent = await fs.readFile(fixturePath, 'utf8')
    expect(normalizeContent(generatedContent || '')).toBe(
      normalizeContent(fixtureContent)
    )
  })

  test('createPhotoPost should create a new photo post', async () => {
    const photoPath = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg'
    )
    const fixturePath = path.join('.', 'test/__fixtures__/new-photo.md')

    const result = await createPhotoPost(destFolder, spinner, photoPath)
    expect(result).toBeDefined()
    expect(result).not.toBe(undefined)

    // For a single photo, result should be a string (the file path)
    expect(typeof result).toBe('string')
    const postPhotoFile = result as string

    // Verify that the photo post was created
    const fileExists = await fs
      .access(postPhotoFile)
      .then(() => true)
      .catch(() => false)

    expect(fileExists).toBe(true)
    expect(spinner.text).toContain('New photo post')

    // Compare the generated index.md with the fixture new-photo.md
    const generatedContent = await fs.readFile(postPhotoFile, 'utf8')
    const fixtureContent = await fs.readFile(fixturePath, 'utf8')
    expect(normalizeContent(generatedContent)).toBe(
      normalizeContent(fixtureContent)
    )
  })

  test('createPhotoPost should create multiple photo posts when given an array of photos', async () => {
    const photoPath1 = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg'
    )
    const photoPath2 = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg'
    ) // Using the same file for simplicity
    const fixturePath = path.join('.', 'test/__fixtures__/new-photo.md')

    const result = await createPhotoPost(destFolder, spinner, [
      photoPath1,
      photoPath2
    ])
    // When multiple photos are provided, result should be an array of file paths
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)

    const postPhotoFiles = result as string[]
    expect(postPhotoFiles.length).toBe(2)

    // Verify that both photo posts were created
    for (const postPhotoFile of postPhotoFiles) {
      const fileExists = await fs
        .access(postPhotoFile)
        .then(() => true)
        .catch(() => false)

      expect(fileExists).toBe(true)

      // Compare the generated index.md with the fixture new-photo.md
      const generatedContent = await fs.readFile(postPhotoFile, 'utf8')
      const fixtureContent = await fs.readFile(fixturePath, 'utf8')
      expect(normalizeContent(generatedContent)).toBe(
        normalizeContent(fixtureContent)
      )
    }
  })

  test('parsePhotoArgs treats last arg as title when not a file', async () => {
    const photo1 = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg'
    )
    const photo2 = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg'
    )
    const { photos, photoTitle } = parsePhotoArgs([photo1, photo2, 'My Title'])
    expect(photos).toEqual([photo1, photo2])
    expect(photoTitle).toBe('My Title')
  })

  test('parsePhotoArgs treats last arg as file when it exists', async () => {
    const photo1 = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg'
    )
    const photo2 = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg'
    )
    const { photos, photoTitle } = parsePhotoArgs([photo1, photo2])
    expect(photos).toEqual([photo1, photo2])
    expect(photoTitle).toBeUndefined()
  })
})
