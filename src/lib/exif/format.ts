//
// Extract EXIF & IPTC data from images
// write to json file `.config/exif.json`
//
import getCoordinates from 'dms2dec'
import Fraction from 'fraction.js'
import type { ExifFormatted, FastExif } from './types.ts'

function formatGps(gpsData: FastExif['gps']): {
  latitude: number
  longitude: number
} {
  const { GPSLatitudeRef, GPSLatitude, GPSLongitudeRef, GPSLongitude } = gpsData

  const GPSdec = getCoordinates(
    GPSLatitude as number[],
    GPSLatitudeRef as string,
    GPSLongitude as number[],
    GPSLongitudeRef as string
  )

  const latitude = Number(GPSdec[0])
  const longitude = Number(GPSdec[1])

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

  const { Model: model } = exifData.image as { Model: string }
  const {
    ISO,
    FNumber,
    ExposureTime,
    FocalLength,
    FocalLengthIn35mmFormat,
    ExposureBiasValue,
    ExposureMode,
    LensModel,
    DateTimeOriginal: date
  } = exifData.exif

  const iso = `ISO ${ISO}`
  const fstop = `ƒ/${FNumber}`
  const focalLength = `${FocalLengthIn35mmFormat || FocalLength}mm`

  // Shutter speed
  const { n, d } = new Fraction(ExposureTime as number)
  const shutterspeed = `${n}/${d}s`

  // GPS
  let gps
  if (exifData.gps) {
    gps = formatGps(exifData.gps)
  }

  // Exposure
  const exposureValue = (ExposureBiasValue || ExposureMode) as number
  const exposure = formatExposure(exposureValue)

  // Model
  model === 'FC7203' ? 'DJI Mavic Mini' : model

  return {
    date: date as string,
    iso,
    model,
    fstop,
    shutterspeed,
    focalLength,
    lensModel: LensModel,
    exposure,
    gps
  }
}
