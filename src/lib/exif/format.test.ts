import { describe, expect, it } from 'vitest'
import {
  formatDate,
  formatExposure,
  formatGps,
  formatImageMetadata
} from './format'
import type { ExitToolTags } from './types'

describe('Exif formatting functions', () => {
  describe('formatDate', () => {
    it('should format ISO string date', () => {
      const input = '2020-12-31T23:59:59.000Z'
      const actual = formatDate(input)
      expect(actual).toBe('2020-12-31T23:59:59.000Z')
    })

    it('should format Date object', () => {
      const input = new Date('2020-12-31T23:59:59.000Z')
      const actual = formatDate(input)
      expect(actual).toBe('2020-12-31T23:59:59.000Z')
    })

    it('should return undefined for invalid date string', () => {
      const input = 'not-a-date'
      const actual = formatDate(input)
      expect(actual).toBeUndefined()
    })

    it('should return undefined for undefined', () => {
      const actual = formatDate(undefined)
      expect(actual).toBeUndefined()
    })

    it('should append offset if provided', () => {
      const input = '2020-12-31T23:59:59.000Z'
      const offset = '+02:00'
      const actual = formatDate(input, offset)
      expect(actual).toBe('2020-12-31T23:59:59.000+02:00')
    })
  })

  describe('formatGps', () => {
    it('should format GPS data correctly', () => {
      const input: ExitToolTags = {
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitude: 52.5,
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitudeRef: 'N',
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLongitude: 13.383333333333333,
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLongitudeRef: 'E'
      }

      const actualGps = formatGps(input)
      expect(actualGps).toEqual({
        latitude: 52.5,
        longitude: 13.383333333333333
      })
    })

    it('should return undefined when GPS data is incomplete', () => {
      const input: ExitToolTags = {
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitudeRef: 'N'
        // Missing longitude data
      }
      const actualGps = formatGps(input)
      expect(actualGps).toBeUndefined()
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
      const input: ExitToolTags = {
        // biome-ignore lint/style/useNamingConvention: external library
        ObjectName: 'Test title',
        'Caption-Abstract': 'Test caption',
        // biome-ignore lint/style/useNamingConvention: external library
        Keywords: ['foo', 'bar'],
        // biome-ignore lint/style/useNamingConvention: external library
        DateTimeOriginal: date.toISOString(),
        // biome-ignore lint/style/useNamingConvention: external library
        ISO: 100,
        // biome-ignore lint/style/useNamingConvention: external library
        Model: 'FC7203',
        // biome-ignore lint/style/useNamingConvention: external library
        FNumber: 2.8,
        // biome-ignore lint/style/useNamingConvention: external library
        ShutterSpeed: '1/50',
        // biome-ignore lint/style/useNamingConvention: external library
        FocalLengthIn35mmFormat: '24mm',
        // biome-ignore lint/style/useNamingConvention: external library
        LensModel: 'Test Lens',
        // biome-ignore lint/style/useNamingConvention: external library
        ExposureCompensation: 0,
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitudeRef: 'N',
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLatitude: 52.5,
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLongitudeRef: 'E',
        // biome-ignore lint/style/useNamingConvention: external library
        GPSLongitude: 13.383333333333333
      }
      const actualExif = formatImageMetadata(input)
      expect(actualExif).toEqual({
        exif: {
          date: date.toISOString(),
          iso: 'ISO 100',
          model: 'DJI Mavic Mini',
          fstop: 'ƒ/2.8',
          shutterspeed: '1/50s',
          focalLength: '24mm',
          lensModel: 'Test Lens',
          exposure: '+/- 0 ev',
          gps: {
            latitude: 52.5,
            longitude: 13.383333333333333
          }
        },
        iptc: {
          title: 'Test title',
          caption: 'Test caption',
          keywords: ['foo', 'bar']
        }
      })
    })

    it('returns nothing when no exif received', () => {
      const actualExif = formatImageMetadata(
        undefined as unknown as ExitToolTags
      )
      expect(actualExif).toBeUndefined()
    })

    it('should handle missing Model', () => {
      const input: ExitToolTags = {
        // biome-ignore lint/style/useNamingConvention: external library
        ISO: 100,
        // biome-ignore lint/style/useNamingConvention: external library
        FNumber: 2.8,
        // biome-ignore lint/style/useNamingConvention: external library
        ShutterSpeed: '1/50'
      }
      const actualExif = formatImageMetadata(input)
      expect(actualExif).toHaveProperty('exif.model', undefined)
    })

    it('should handle missing photo fields', () => {
      const input: ExitToolTags = {
        // biome-ignore lint/style/useNamingConvention: external library
        Model: 'Camera Model'
      }
      const actualExif = formatImageMetadata(input)
      expect(actualExif).toEqual({
        exif: {
          date: undefined,
          iso: undefined,
          model: 'Camera Model',
          fstop: undefined,
          shutterspeed: undefined,
          focalLength: undefined,
          lensModel: undefined,
          exposure: undefined,
          gps: undefined
        },
        iptc: {
          title: undefined,
          caption: undefined,
          keywords: []
        }
      })
    })

    it('should handle missing individual EXIF fields', () => {
      const input: ExitToolTags = {
        // biome-ignore lint/style/useNamingConvention: external library
        Model: 'Camera Model',
        // biome-ignore lint/style/useNamingConvention: external library
        ISO: 400
      }
      const actualExif = formatImageMetadata(input)
      expect(actualExif).toEqual({
        exif: {
          date: undefined,
          iso: 'ISO 400',
          model: 'Camera Model',
          fstop: undefined,
          shutterspeed: undefined,
          focalLength: undefined,
          lensModel: undefined,
          exposure: undefined,
          gps: undefined
        },
        iptc: {
          title: undefined,
          caption: undefined,
          keywords: []
        }
      })
    })
  })
})
