import type { Exif as ExifReader, GPSInfoTags, PhotoTags } from 'exif-reader'
import { describe, expect, it } from 'vitest'
import { formatExif, formatExposure, formatGps } from './format'
describe('Exif formatting functions', () => {
  describe('formatGps', () => {
    it('should format GPS data correctly', () => {
      const input: Partial<GPSInfoTags> = {
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitudeRef: 'N',
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitude: [52, 30, 0],
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLongitudeRef: 'E',
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLongitude: [13, 23, 0]
      }
      const result = formatGps(input)
      expect(result).toEqual({
        latitude: 52.5,
        longitude: 13.383333333333333
      })
    })

    it('should return undefined when GPS data is incomplete', () => {
      const input: Partial<GPSInfoTags> = {
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitudeRef: 'N',
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitude: [52, 30, 0]
        // Missing longitude data
      }
      const result = formatGps(input)
      expect(result).toBeUndefined()
    })
  })

  describe('formatExposure', () => {
    it('should format exposure correctly for positive numbers', () => {
      const input = 0.25
      const result = formatExposure(input)
      expect(result).toBe('+ 0.25 ev')
    })

    it('should format exposure correctly for negative numbers', () => {
      const input = -0.25
      const result = formatExposure(input)
      expect(result).toBe('- 0.25 ev')
    })

    it('should format zero exposure correctly', () => {
      const input = 0
      const result = formatExposure(input)
      expect(result).toBe('+/- 0 ev')
    })
  })

  describe('formatExif', () => {
    it('should format EXIF data correctly', () => {
      const date = new Date('2020-12-31T23:59:59.000Z')

      const input: ExifReader = {
        bigEndian: true,
        // biome-ignore lint/style/useNamingConvention: external library
        Image: {
          // biome-ignore lint/style/useNamingConvention: external library
          Model: 'FC7203'
        },
        // biome-ignore lint/style/useNamingConvention: external library
        Photo: {
          // biome-ignore lint/style/useNamingConvention: external library
          ISOSpeedRatings: 100,
          // biome-ignore lint/style/useNamingConvention: external library
          FNumber: 2.8,
          // biome-ignore lint/style/useNamingConvention: external library
          ExposureTime: 1 / 50,
          // biome-ignore lint/style/useNamingConvention: external library
          FocalLength: 24,
          // biome-ignore lint/style/useNamingConvention: external library
          ExposureBiasValue: 0,
          // biome-ignore lint/style/useNamingConvention: external library
          DateTimeOriginal: date
        } as PhotoTags,
        // biome-ignore lint/style/useNamingConvention: external library
        GPSInfo: {
          // biome-ignore lint/style/useNamingConvention: external library
          GPSLatitudeRef: 'N',
          // biome-ignore lint/style/useNamingConvention: external library
          GPSLatitude: [52, 30, 0],
          // biome-ignore lint/style/useNamingConvention: external library
          GPSLongitudeRef: 'E',
          // biome-ignore lint/style/useNamingConvention: external library
          GPSLongitude: [13, 23, 0]
        }
      }

      const result = formatExif(input)
      expect(result).toEqual({
        date: date.toISOString(),
        iso: 'ISO 100',
        model: 'DJI Mavic Mini',
        fstop: 'ƒ/2.8',
        shutterspeed: '1/50s',
        focalLength: '24mm',
        lensModel: undefined,
        exposure: '+/- 0 ev',
        gps: {
          latitude: 52.5,
          longitude: 13.383333333333333
        }
      })
    })

    it('returns nothing when no exif received', () => {
      const input = undefined as unknown as ExifReader
      const result = formatExif(input)
      expect(result).toBeUndefined()
    })

    it('should handle missing Image data', () => {
      const input: ExifReader = {
        bigEndian: true,
        // biome-ignore lint/style/useNamingConvention: external library
        Photo: {
          // biome-ignore lint/style/useNamingConvention: external library
          ISOSpeedRatings: 100,
          // biome-ignore lint/style/useNamingConvention: external library
          FNumber: 2.8,
          // biome-ignore lint/style/useNamingConvention: external library
          ExposureTime: 1 / 50
        } as PhotoTags
      }

      const result = formatExif(input)
      expect(result).toHaveProperty('model', undefined)
    })

    it('should handle missing Photo data', () => {
      const input: ExifReader = {
        bigEndian: true,
        // biome-ignore lint/style/useNamingConvention: external library
        Image: {
          // biome-ignore lint/style/useNamingConvention: external library
          Model: 'Camera Model'
        }
      }

      const result = formatExif(input)
      expect(result).toEqual({
        date: undefined,
        iso: undefined,
        model: 'Camera Model',
        fstop: undefined,
        shutterspeed: undefined,
        focalLength: undefined,
        lensModel: undefined,
        exposure: undefined,
        gps: undefined
      })
    })

    it('should handle FNumber with long decimal value', () => {
      const input: ExifReader = {
        bigEndian: true,
        // biome-ignore lint/style/useNamingConvention: external library
        Image: {
          // biome-ignore lint/style/useNamingConvention: external library
          Model: 'Camera Model'
        },
        // biome-ignore lint/style/useNamingConvention: external library
        Photo: {
          // biome-ignore lint/style/useNamingConvention: external library
          FNumber: 1.7799999713880652
        } as PhotoTags
      }

      const result = formatExif(input)
      expect(result).toHaveProperty('fstop', 'ƒ/1.78')
    })

    it('should handle FNumber with trailing zeros', () => {
      const input: ExifReader = {
        bigEndian: true,
        // biome-ignore lint/style/useNamingConvention: external library
        Image: {
          // biome-ignore lint/style/useNamingConvention: external library
          Model: 'Camera Model'
        },
        // biome-ignore lint/style/useNamingConvention: external library
        Photo: {
          // biome-ignore lint/style/useNamingConvention: external library
          FNumber: 2.8
        } as PhotoTags
      }

      const result = formatExif(input)
      expect(result).toHaveProperty('fstop', 'ƒ/2.8')
    })

    it('should handle missing individual EXIF fields', () => {
      const input: ExifReader = {
        bigEndian: true,
        // biome-ignore lint/style/useNamingConvention: external library
        Image: {
          // biome-ignore lint/style/useNamingConvention: external library
          Model: 'Camera Model'
        },
        // biome-ignore lint/style/useNamingConvention: external library
        Photo: {
          // Missing most fields
          // biome-ignore lint/style/useNamingConvention: external library
          ISOSpeedRatings: 400
        } as PhotoTags
      }

      const result = formatExif(input)
      expect(result).toEqual({
        date: undefined,
        iso: 'ISO 400',
        model: 'Camera Model',
        fstop: undefined,
        shutterspeed: undefined,
        focalLength: undefined,
        lensModel: undefined,
        exposure: undefined,
        gps: undefined
      })
    })
  })
})
