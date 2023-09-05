//
// Extract EXIF & IPTC data from images
// write to json file `.config/exif.json`
//
import getCoordinates from 'dms2dec'
import Fraction from 'fraction.js'
import type { ExifFormatted, FastExif } from './types.ts'

function formatGps(gpsData: FastExif['gps']): {
  latitude: string
  longitude: string
} {
  if (!gpsData) return { latitude: '', longitude: '' }

  const { GPSLatitudeRef, GPSLatitude, GPSLongitudeRef, GPSLongitude } = gpsData

  const GPSdec = getCoordinates(
    GPSLatitude as number[],
    GPSLatitudeRef as string,
    GPSLongitude as number[],
    GPSLongitudeRef as string
  )

  const latitude = GPSdec[0]
  const longitude = GPSdec[1]

  return { latitude, longitude }
}

function formatExposure(exposureMode: number) {
  if (exposureMode === null || exposureMode === undefined) return

  const exposureShortened = parseFloat(exposureMode.toFixed(2))
  let exposure

  if (exposureMode === 0) {
    exposure = `+/- ${exposureShortened} ev`
  } else if (exposureMode > 0) {
    exposure = `+ ${exposureShortened} ev`
  } else {
    exposure = `${exposureShortened} ev`
  }

  return exposure
}

export function formatExif(exifData: FastExif): ExifFormatted | undefined {
  if (!exifData?.exif) return

  const { Model } = exifData.image as { Model: string }
  const {
    ISO,
    FNumber,
    ExposureTime,
    FocalLength,
    FocalLengthIn35mmFormat,
    ExposureBiasValue,
    ExposureMode,
    LensModel
  } = exifData.exif

  const iso = `ISO ${ISO}`
  const fstop = `ƒ/${FNumber}`
  const focalLength = `${FocalLengthIn35mmFormat || FocalLength}mm`

  // Shutter speed
  const { n, d } = new Fraction(ExposureTime as number)
  const shutterspeed = `${n}/${d}s`

  // GPS
  let latitude
  let longitude
  if (exifData.gps) ({ latitude, longitude } = formatGps(exifData.gps))

  // Exposure
  const exposureValue = (ExposureBiasValue || ExposureMode) as number
  const exposure = formatExposure(exposureValue)

  return {
    iso,
    model: Model,
    fstop,
    shutterspeed,
    focalLength,
    lensModel: LensModel,
    exposure,
    gps: { latitude, longitude }
  }
}
