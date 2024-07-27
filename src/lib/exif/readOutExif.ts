import fs from 'node:fs'
import path from 'node:path'
import { read } from 'fast-exif'
import iptc from 'node-iptc'
import { formatExif } from './format.ts'
import type { Exif, ExifFormatted, FastExif } from './types.ts'

export async function readOutExif(filePath: string): Promise<Exif | undefined> {
  if (!filePath) return

  const imageId = path.basename(filePath, path.extname(filePath))

  try {
    // exif
    const exifData = (await read(filePath, true)) as FastExif
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
  } catch (error: unknown) {
    console.error(`${imageId}: ${(error as Error).message}`)
  }
}
