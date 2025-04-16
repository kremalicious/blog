// fork of https://github.com/withastro/astro/blob/99af0d135b04304c1138fb57bb1809657184f7ce/packages/astro/src/assets/services/sharp.ts
// to include the sharp keepMetadata option

import sharp, { type FormatEnum, type FitEnum } from 'sharp'
import type { LocalImageService } from '../../../node_modules/astro/dist/assets/services/service'
import sharpService from '../../../node_modules/astro/dist/assets/services/sharp'
import type {
  ImageFit,
  ImageOutputFormat,
  ImageQualityPreset
} from '../../../node_modules/astro/dist/assets/types'

const qualityTable: Record<ImageQualityPreset, number> = {
  low: 25,
  mid: 50,
  high: 80,
  max: 100
}

const fitMap: Record<ImageFit, keyof FitEnum> = {
  fill: 'fill',
  contain: 'inside',
  cover: 'cover',
  none: 'outside',
  'scale-down': 'inside',
  outside: 'outside',
  inside: 'inside'
}

const extendedSharpService: LocalImageService = {
  ...sharpService,

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity comes from Astro implementation
  async transform(inputBuffer, transformOptions, config) {
    // Return SVGs as-is
    if (transformOptions.format === 'svg') {
      return { data: inputBuffer, format: 'svg' }
    }

    const transform = transformOptions as {
      width?: number
      height?: number
      fit?: ImageFit
      position?: string
      format?: string
      quality?: number | ImageQualityPreset
    }

    // Create sharp instance and immediately call keepMetadata
    const result = sharp(inputBuffer, {
      failOnError: false,
      pages: -1,
      limitInputPixels: config.service.config.limitInputPixels
    }).keepMetadata()

    // always call rotate to adjust for EXIF data orientation
    result.rotate()

    // If `fit` isn't set then use old behavior:
    // - Do not use both width and height for resizing, and prioritize width over height
    // - Allow enlarging images
    const withoutEnlargement = Boolean(transform.fit)
    if (transform.width && transform.height && transform.fit) {
      const fit: keyof FitEnum = fitMap[transform.fit] ?? 'inside'
      result.resize({
        width: Math.round(transform.width),
        height: Math.round(transform.height),
        fit,
        position: transform.position,
        withoutEnlargement
      })
    } else if (transform.height && !transform.width) {
      result.resize({
        height: Math.round(transform.height),
        withoutEnlargement
      })
    } else if (transform.width) {
      result.resize({
        width: Math.round(transform.width),
        withoutEnlargement
      })
    }

    if (transform.format) {
      let quality: number | undefined
      if (transform.quality) {
        if (typeof transform.quality === 'number') {
          quality = transform.quality
        } else {
          quality =
            transform.quality in qualityTable
              ? qualityTable[transform.quality]
              : undefined
        }
      }

      result.toFormat(transform.format as keyof FormatEnum, { quality })
    }

    // Get the final result
    const { data, info } = await result.toBuffer({ resolveWithObject: true })

    return {
      data,
      format: info.format as ImageOutputFormat
    }
  }
}

export default extendedSharpService
