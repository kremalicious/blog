import path from 'node:path'
import { extractExifData } from './exif.ts'
import { extractIptcData } from './iptc.ts'
import type { Exif } from './types.ts'

export async function readOutExif(filePath: string): Promise<Exif | undefined> {
  if (!filePath) return

  const imageId = path.basename(filePath, path.extname(filePath))

  // Extract EXIF data
  const result = await extractExifData(filePath, imageId)
  if (!result || !result.exifDataFormatted) return undefined

  // Extract IPTC data
  const iptcData = await extractIptcData(filePath, imageId)

  // Create the final object
  const exif: Exif = {
    image: imageId,
    exif: result.exifDataFormatted,
    iptc: iptcData || {}
  }

  return exif
}
