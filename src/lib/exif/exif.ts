import exifReader from 'exif-reader'
import type { Exif as ExifReader } from 'exif-reader'
import sharp from 'sharp'
import type { Metadata } from 'sharp'
import { formatExif } from './format'
import type { ExifFormatted } from './types'

export async function extractExifData(
  filePath: string,
  imageId: string
): Promise<
  | {
      metadata?: Metadata
      exifData?: ExifReader
      exifDataFormatted?: ExifFormatted
    }
  | undefined
> {
  try {
    // Extract metadata using Sharp
    const metadata = await sharp(filePath).metadata()

    if (!metadata?.exif) {
      console.warn(`No EXIF data found for ${imageId}`)
      return undefined
    }

    // Parse EXIF data
    try {
      const exifData = exifReader(metadata.exif)
      if (!exifData) {
        console.warn(`No EXIF data could be parsed for ${imageId}`)
        return undefined
      }

      // Format EXIF data
      const exifDataFormatted = formatExif(exifData)
      return { metadata, exifData, exifDataFormatted }
    } catch (error: unknown) {
      console.error(
        `Failed to parse EXIF data for ${imageId}: ${error instanceof Error ? error.message : String(error)}`
      )
      return undefined
    }
  } catch (error: unknown) {
    console.error(
      `Failed to extract metadata for ${imageId}: ${error instanceof Error ? error.message : String(error)}`
    )
    return undefined
  }
}
