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
      // console.warn(`No IPTC data found or empty IPTC data for ${imageId}`)
      return undefined
    }

    return iptcData
  } catch (iptcError) {
    console.warn(
      `IPTC parsing error for ${imageId}: ${iptcError instanceof Error ? iptcError.message : String(iptcError)}`
    )
    return undefined
  }
}
