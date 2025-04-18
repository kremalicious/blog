import { describe, expect, it } from 'vitest'
import { formatDate, formatExposure, formatGps } from './format-helpers'
import type { ExifrGps } from './types'

describe('formatDate', () => {
  const dateIsoString = '2020-12-31T23:59:59.000Z'
  const offset = '+02:00'
  const dateExpected = '2020-12-31T21:59:59.000+02:00'

  it('should format ISO string date', () => {
    const actual = formatDate(dateIsoString, offset)
    expect(actual).toBe(dateExpected)
  })

  it('should format Date object', () => {
    const input = new Date(dateIsoString)
    const actual = formatDate(input, offset)
    expect(actual).toBe(dateExpected)
  })

  it('should return undefined for invalid date string', () => {
    const input = 'not-a-date'
    const actual = formatDate(input, offset)
    expect(actual).toBeUndefined()
  })

  it('should return undefined for undefined', () => {
    const actual = formatDate(undefined, offset)
    expect(actual).toBeUndefined()
  })
})

describe('formatGps', () => {
  it('should format GPS data correctly', () => {
    const input: ExifrGps = {
      latitude: 52.5,
      // biome-ignore lint/style/useNamingConvention: external library
      GPSLatitudeRef: 'N',
      longitude: 13.383333333333333,
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
    const input: ExifrGps = {
      latitude: undefined
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

  it('parses numeric string', () => {
    const actual = formatExposure(1.5)
    expect(actual).toBe('+ 1.5 ev')
  })

  it('returns undefined for non-numeric string', () => {
    const actual = formatExposure('not-a-number' as unknown as any)
    expect(actual).toBeUndefined()
  })
})
