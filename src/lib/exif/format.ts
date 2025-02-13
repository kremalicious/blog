//
// Format EXIF data
//
import getCoordinates from 'dms2dec'
import Fraction from 'fraction.js'
import type { ExifFormatted, FastExif, Gps, GpsFastExif } from './types.ts'

export function formatGps(gpsData: GpsFastExif): Gps {
  const { GPSLatitudeRef, GPSLatitude, GPSLongitudeRef, GPSLongitude } = gpsData

  const gpSdec = getCoordinates(
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef
  )

  const latitude = Number(gpSdec[0])
  const longitude = Number(gpSdec[1])

  return { latitude, longitude }
}

export function formatExposure(exposureMode: number): string {
  if (!exposureMode || exposureMode === 0) return '+/- 0 ev'

  const exposureShortened = Number.parseFloat(exposureMode.toFixed(2))
  let exposure: string

  if (exposureMode > 0) {
    exposure = `+ ${exposureShortened} ev`
  } else {
    exposure = `- ${Math.abs(exposureShortened)} ev`
  }

  return exposure
}

export function formatExif(exifData: FastExif): ExifFormatted | undefined {
  if (!exifData?.exif) return

  // biome-ignore lint/style/useNamingConvention: external library
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
  let gps: Gps | undefined
  if (exifData.gps) {
    gps = formatGps(exifData.gps)
  }

  // Exposure
  const exposureValue = (ExposureBiasValue || ExposureMode) as number
  const exposure = formatExposure(exposureValue)

  // Model
  const formattedModel = model === 'FC7203' ? 'DJI Mavic Mini' : model

  return {
    date: date as string,
    iso,
    model: formattedModel,
    fstop,
    shutterspeed,
    focalLength,
    lensModel: LensModel as string,
    exposure,
    gps
  }
}
