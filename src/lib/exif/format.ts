//
// Format EXIF data
//
import getCoordinates from 'dms2dec'
import type { Exif as ExifReader, GPSInfoTags, PhotoTags } from 'exif-reader'
import Fraction from 'fraction.js'
import type { ExifFormatted, Gps } from './types.ts'

export function formatGps(gpsData: Partial<GPSInfoTags>): Gps | undefined {
  const { GPSLatitudeRef, GPSLatitude, GPSLongitudeRef, GPSLongitude } = gpsData
  if (!GPSLatitude || !GPSLongitude || !GPSLatitudeRef || !GPSLongitudeRef)
    return

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

export function formatExif(exifData: ExifReader): ExifFormatted | undefined {
  if (!exifData) return

  // biome-ignore lint/style/useNamingConvention: external library
  const { Model: model } = exifData.Image as { Model: string }
  const {
    ISOSpeedRatings,
    FNumber,
    ExposureTime,
    FocalLength,
    FocalLengthIn35mmFilm,
    ExposureBiasValue,
    ExposureMode,
    LensModel,
    DateTimeOriginal: date
  } = exifData.Photo as PhotoTags

  const iso = `ISO ${ISOSpeedRatings}`
  const fstop = `ƒ/${FNumber}`
  const focalLength = `${FocalLengthIn35mmFilm || FocalLength}mm`

  // Shutter speed
  const { n, d } = new Fraction(ExposureTime as number)
  const shutterspeed = `${n}/${d}s`

  // GPS
  let gps: Gps | undefined
  if (exifData.GPSInfo) {
    gps = formatGps(exifData.GPSInfo)
  }

  // Exposure
  const exposureValue = (ExposureBiasValue || ExposureMode) as number
  const exposure = formatExposure(exposureValue)

  // Model
  const formattedModel = model === 'FC7203' ? 'DJI Mavic Mini' : model

  return {
    date: date?.toISOString(),
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
