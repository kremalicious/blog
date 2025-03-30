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

// Helper function to format exposure data
function formatExposureData(
  ExposureBiasValue?: number,
  ExposureMode?: number
): string | undefined {
  if (ExposureBiasValue === undefined && ExposureMode === undefined) {
    return
  }

  const exposureValue = (ExposureBiasValue ?? ExposureMode ?? 0) as number
  return formatExposure(exposureValue)
}

// Extract and format camera information
function formatCameraInfo(model?: string): string | undefined {
  if (!model) return
  return model === 'FC7203' ? 'DJI Mavic Mini' : model
}

// Format shutter speed
function formatShutterSpeed(ExposureTime?: number): string | undefined {
  if (!ExposureTime) return
  const { n, d } = new Fraction(ExposureTime)
  return `${n}/${d}s`
}

export function formatExif(exifData: ExifReader): ExifFormatted | undefined {
  if (!exifData) return

  const model = exifData.Image?.Model
  const {
    ISOSpeedRatings,
    FNumber,
    ExposureTime,
    FocalLength,
    FocalLengthIn35mmFilm,
    ExposureBiasValue,
    ExposureMode,
    LensModel: lensModel,
    DateTimeOriginal: date,
    OffsetTimeOriginal
  } = exifData.Photo ?? ({} as Partial<PhotoTags>)

  const formattedIso = ISOSpeedRatings ? `ISO ${ISOSpeedRatings}` : undefined
  const formattedFstop = FNumber
    ? `ƒ/${typeof FNumber === 'number' ? Number.parseFloat(FNumber.toFixed(2)) : FNumber}`
    : undefined
  const formattedFocalLength =
    FocalLength || FocalLengthIn35mmFilm
      ? `${FocalLengthIn35mmFilm || FocalLength}mm`
      : undefined
  const formattedShutterspeed = formatShutterSpeed(ExposureTime as number)
  const formattedModel = formatCameraInfo(model)

  // Format date with timezone information from OffsetTimeOriginal
  let formattedDate: string | undefined
  if (date instanceof Date) {
    if (OffsetTimeOriginal) {
      // Convert the date to ISO string with the original timezone offset
      const [hours, minutes] = OffsetTimeOriginal.split(':').map(Number)
      const offsetMs = (hours * 60 + (minutes || 0)) * 60 * 1000
      const utcDate = new Date(date.getTime() - offsetMs)
      formattedDate = utcDate.toISOString().replace('Z', OffsetTimeOriginal)
    } else {
      formattedDate = date.toISOString()
    }
  }

  // GPS and exposure
  let formattedGps: Gps | undefined
  if (exifData.GPSInfo) {
    formattedGps = formatGps(exifData.GPSInfo)
  }

  const formattedExposure = formatExposureData(
    ExposureBiasValue as number,
    ExposureMode as number
  )

  return {
    date: formattedDate,
    iso: formattedIso,
    model: formattedModel,
    fstop: formattedFstop,
    shutterspeed: formattedShutterspeed,
    focalLength: formattedFocalLength,
    lensModel,
    exposure: formattedExposure,
    gps: formattedGps
  }
}
