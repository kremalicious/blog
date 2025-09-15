import exifr from 'exifr'
import type { ImageMetadataFormatted } from '../../types'
import { formatImageMetadata } from './format'

export async function readImageMetadata(
  filePath: string
): Promise<ImageMetadataFormatted | undefined> {
  if (!filePath) return undefined

  try {
    const exifRaw = await exifr.parse(filePath, {
      exif: true,
      iptc: true,
      icc: false,
      gps: true,
      mergeOutput: false
    })
    if (!exifRaw) return undefined

    return formatImageMetadata(exifRaw)
  } catch (error) {
    console.error(
      `Failed to extract metadata: ${error instanceof Error ? error.message : String(error)}`
    )
    return undefined
  }
}
