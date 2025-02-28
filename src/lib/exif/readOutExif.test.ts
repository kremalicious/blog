import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { readOutExif } from '.'

describe('readOutExif', () => {
  test('should extract EXIF data from image with metadata', async () => {
    const photoPath = path.resolve(
      process.cwd(),
      'test/__fixtures__/image-with-metadata.jpg' // has exif & iptc data
    )

    const exifData = await readOutExif(photoPath)

    // Verify basic structure
    expect(exifData).toBeDefined()
    expect(exifData?.image).toBe('image-with-metadata')
    expect(exifData?.exif).toBeDefined()

    // Verify some specific EXIF fields
    expect(exifData?.exif.date).toBeDefined()
    expect(exifData?.exif.model).toBeDefined()
    expect(exifData?.exif.iso).toBeDefined()

    // GPS data should be present
    expect(exifData?.exif.gps).toBeDefined()
    expect(exifData?.exif.gps?.latitude).toBeDefined()
    expect(exifData?.exif.gps?.longitude).toBeDefined()

    // IPTC data should be present and contain specific fields
    expect(exifData?.iptc).toBeDefined()
    expect(exifData?.iptc.object_name).toBe('Test title')
    expect(exifData?.iptc.caption).toBe('Beach cliffs')
    expect(exifData?.iptc.keywords).toContain('portugal')
    expect(exifData?.iptc.keywords).toContain('sand')
  })

  test('should return undefined for non-existent image', async () => {
    const exifData = await readOutExif('non-existent-image.jpg')
    expect(exifData).toBeUndefined()
  })
})
