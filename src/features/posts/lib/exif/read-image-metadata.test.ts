import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { readImageMetadata } from './read-image-metadata'

describe('readImageMetadata', () => {
  test('should extract EXIF data from image with metadata', async () => {
    const photoPath = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg' // has exif & iptc data
    )

    const metadata = await readImageMetadata(photoPath)

    // Verify basic structure
    expect(metadata).toBeDefined()

    // Verify some specific metadata fields
    expect(metadata?.exif.date).toBeDefined()
    expect(metadata?.exif.model).toBeDefined()
    expect(metadata?.exif.iso).toBeDefined()

    // GPS data should be present
    expect(metadata?.gps).toBeDefined()
    expect(metadata?.gps?.latitude).toBeDefined()
    expect(metadata?.gps?.longitude).toBeDefined()

    // Title, caption, keywords (formerly IPTC) should be present
    expect(metadata?.iptc.title).toBe('Test title')
    expect(metadata?.iptc.caption).toBe('Beach cliffs')
    expect(metadata?.iptc.keywords).toContain('portugal')
    expect(metadata?.iptc.keywords).toContain('sand')
  })

  test('should return undefined for non-existent image', async () => {
    const exifData = await readImageMetadata('non-existent-image.jpg')
    expect(exifData).toBeUndefined()
  })
})
