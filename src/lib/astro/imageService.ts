import sharp, { type FormatEnum } from 'sharp'
import type { LocalImageService } from '../../../node_modules/astro/dist/assets/services/service'
import sharpService from '../../../node_modules/astro/dist/assets/services/sharp'

const extendedSharpService: LocalImageService = {
  ...sharpService,
  async transform(inputBuffer, transformOptions, config) {
    // Call the original transform function
    const result = await sharpService.transform(
      inputBuffer,
      transformOptions,
      config
    )

    // Modify the result to include the keepMetadata option
    if (result.format !== 'svg') {
      const sharpInstance = sharp(result.data)
      try {
        const { data, info } = await sharpInstance
          .keepMetadata()
          .toFormat(result.format as keyof FormatEnum)
          .toBuffer({ resolveWithObject: true })
        return {
          data: data,
          format: info.format
        }
      } catch (error) {
        console.error('Error processing image:', error)
        throw error
      }
    }

    return result
  }
}

export default extendedSharpService
