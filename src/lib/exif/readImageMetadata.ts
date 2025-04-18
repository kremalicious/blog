import { exiftool } from 'exiftool-vendored'
import { formatImageMetadata } from './format.ts'
import type { ExitToolTags, ImageMetadataFormatted } from './types.ts'

export async function readImageMetadata(
  filePath: string
): Promise<ImageMetadataFormatted | undefined> {
  if (!filePath) return undefined

  try {
    const metadataExiftool: ExitToolTags = await exiftool.read(filePath)
    if (!metadataExiftool) throw new Error('No metadata found')

    return formatImageMetadata(metadataExiftool)
  } catch (error) {
    console.error(
      `Failed to extract metadata: ${error instanceof Error ? error.message : String(error)}`
    )
    return undefined
  }
}
