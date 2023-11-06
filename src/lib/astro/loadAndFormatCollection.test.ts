import { test, expect, vi, beforeEach, afterEach, describe } from 'vitest'
import * as astroContent from 'astro:content'
import * as exifLib from '@lib/exif'
import { loadAndFormatCollection } from './loadAndFormatCollection'
import getCollectionArticles from '@test/__fixtures__/getCollectionArticles.json'
import getCollectionLinks from '@test/__fixtures__/getCollectionLinks.json'
import getCollectionPhotos from '@test/__fixtures__/getCollectionPhotos.json'

let getCollectionSpy: any
let readOutExifSpy: any
let consoleErrorSpy: any

beforeEach(() => {
  getCollectionSpy = vi.spyOn(astroContent, 'getCollection')

  readOutExifSpy = vi.spyOn(exifLib, 'readOutExif')
  readOutExifSpy.mockImplementationOnce(async () => ({
    exif: 'mocked exif',
    iptc: 'mocked iptc'
  }))

  // Silence console.error
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  getCollectionSpy.mockRestore()
  consoleErrorSpy.mockRestore()
})

describe('loadAndFormatCollection', () => {
  test('loads articles', async () => {
    getCollectionSpy.mockImplementationOnce(async () => getCollectionArticles)
    const result = await loadAndFormatCollection('articles')
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })

  test('loads links', async () => {
    getCollectionSpy.mockImplementationOnce(async () => getCollectionLinks)
    const result = await loadAndFormatCollection('links')
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })

  test('loads photos', async () => {
    getCollectionSpy.mockImplementationOnce(async () => getCollectionPhotos)
    const result = await loadAndFormatCollection('photos')
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })

  test('loads photos in production', async () => {
    const originalEnv = import.meta.env.PROD
    import.meta.env.PROD = true

    getCollectionSpy.mockImplementationOnce(async () => getCollectionPhotos)
    const result = await loadAndFormatCollection('photos')
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)

    import.meta.env.PROD = originalEnv
  })

  test('filters out drafts in production', async () => {
    const originalEnv = import.meta.env.PROD
    import.meta.env.PROD = true

    const mockDrafts = [
      { id: '/what/an/id/and/la', data: { draft: true }, otherFields: '...' },
      { id: '/what/an/id/and/le', data: { draft: false }, otherFields: '...' },
      { id: '/what/an/id/and/lu', data: { draft: true }, otherFields: '...' }
    ] as any

    getCollectionSpy.mockImplementationOnce(async () => mockDrafts)
    const result = await loadAndFormatCollection('articles')
    expect(result).toBeDefined()
    // Only one article should remain after filtering out drafts
    expect(result.length).toBe(1)
    // The remaining article should not be a draft
    expect(result[0].data.draft).toBe(false)

    import.meta.env.PROD = originalEnv
  })
})
