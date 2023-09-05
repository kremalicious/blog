import fs from 'node:fs/promises'
import path from 'node:path'
import { read } from 'fast-exif'
import iptc from 'node-iptc'
import ora from 'ora'
import type { Exif, ExifFormatted } from './types.ts'
import { formatExif } from './format.ts'

const imageFolder = path.join(process.cwd(), 'content', 'photos')
const outputFilePath = '.config/exif.json'

const spinner = ora('Extracting EXIF metadata from all photos').start()

async function readOutExif(filePath: string): Promise<Exif | undefined> {
  if (!filePath) return

  try {
    // exif
    const exifData = await read(filePath, true)
    if (!exifData) return

    // iptc
    const file = await fs.readFile(filePath)
    const iptcData = iptc(file)

    // format before output
    const exifDataFormatted = formatExif(exifData)
    const imageId = path.basename(filePath, path.extname(filePath))

    const exif = {
      image: imageId,
      exif: { ...exifDataFormatted } as ExifFormatted,
      iptc: { ...iptcData }
    }

    return exif
  } catch (error: any) {
    console.error(`${filePath}: ${error.message}`)
  }
}

async function processImages(folderPath: string): Promise<Exif[]> {
  const allExif: Exif[] = []

  try {
    const files = await fs.readdir(folderPath, { recursive: true })

    for (const file of files) {
      const filePath = path.join(folderPath, file)
      const stats = await fs.stat(filePath)

      if (stats.isFile()) {
        // Check if it's an image file based on its file extension
        const fileExtension = path.extname(filePath).toLowerCase()

        if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
          const exif = await readOutExif(filePath)
          if (!exif) continue
          allExif.push(exif)
        }
      }
    }
  } catch (err) {
    console.error('Error:', (err as Error).message)
  }

  return allExif
}

try {
  const allExif = await processImages(imageFolder)
  const allExifJSON = JSON.stringify(allExif, null, 2)

  // Write the redirects object to the output file
  fs.writeFile(outputFilePath, allExifJSON, 'utf-8')

  spinner.succeed(`Extracted EXIF data from ${allExif.length} photos`)
} catch (error: any) {
  spinner.fail((error as Error).message)
}
