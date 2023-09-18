import fs from 'node:fs'
import path from 'node:path'
import { read } from 'fast-exif'
import iptc from 'node-iptc'
import type { Exif, ExifFormatted } from './types.ts'
import { formatExif } from './format.ts'

export async function readOutExif(filePath: string): Promise<Exif | undefined> {
  if (!filePath) return

  const imageId = path.basename(filePath, path.extname(filePath))

  try {
    // exif
    const exifData = await read(filePath, true)
    if (!exifData) return

    // iptc
    const file = fs.readFileSync(filePath)
    const iptcData = iptc(file)

    // format before output
    const exifDataFormatted = formatExif(exifData)

    const exif = {
      image: imageId,
      exif: { ...exifDataFormatted } as ExifFormatted,
      iptc: { ...iptcData }
    }

    return exif
  } catch (error: any) {
    console.error(`${imageId}: ${error.message}`)
  }
}
