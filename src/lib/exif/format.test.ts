import { describe, expect, it } from 'vitest'
import type { FastExif } from '.'
import { formatExif, formatExposure, formatGps } from './format'

describe('Exif formatting functions', () => {
  describe('formatGps', () => {
    it('should format GPS data correctly', () => {
      const input: FastExif['gps'] = {
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
  })

  describe('formatExif', () => {
    it('should format EXIF data correctly', () => {
      const input: FastExif = {
        // biome-ignore lint/style/useNamingConvention: external library
        image: { Model: 'FC7203' },
        exif: {
          // biome-ignore lint/style/useNamingConvention: external library
          ISO: 100,
          // biome-ignore lint/style/useNamingConvention: external library
          FNumber: 2.8,
          // biome-ignore lint/style/useNamingConvention: external library
          ExposureTime: 1 / 50,
          // biome-ignore lint/style/useNamingConvention: external library
          FocalLength: 24,
          // biome-ignore lint/style/useNamingConvention: external library
          ExposureBiasValue: 0,
          // biome-ignore lint/style/useNamingConvention: external library
          DateTimeOriginal: '2020-12-31T23:59:59.000Z'
        },
        gps: {
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
        date: expect.any(String),
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
      const input: FastExif = {}
      const result = formatExif(input)
      expect(result).toBeUndefined()
    })
  })
})
