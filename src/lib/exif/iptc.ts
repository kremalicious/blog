import fs from 'node:fs'
import iptc from 'node-iptc'

export async function extractIptcData(
  filePath: string,
  imageId: string
): Promise<IptcData | undefined> {
  try {
    // Read the raw file - this is more reliable for IPTC extraction
    const fileBuffer = await fs.promises.readFile(filePath)
    const iptcData = iptc(fileBuffer)

    if (!iptcData || Object.keys(iptcData).length === 0) {
      console.warn(
        `No IPTC data found or empty IPTC data for ${imageId}. File path: ${filePath}`
      )
      return undefined
    }

    // Debug log the found IPTC data
    // console.log(
    //   'Found IPTC data for',
    //   imageId,
    //   ':',
    //   Object.entries(iptcData)
    //     .filter(([_, value]) => value !== undefined)
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join('\n')
    // )

    return iptcData
  } catch (error) {
    console.warn(
      `IPTC parsing error for ${imageId}: ${error instanceof Error ? error.message : String(error)}`
    )
    return undefined
  }
}
