import type { ExifrGps, GpsFormatted } from './types'

export function formatFocalLength(
  focalLength: number | undefined
): string | undefined {
  return focalLength ? `${focalLength.toString()}mm` : undefined
}

export function formatKeywords(
  keywords: string[] | string | undefined
): string[] {
  return Array.isArray(keywords) ? keywords : keywords ? [keywords] : []
}

export function formatDate(
  date: Date | string | undefined,
  offsetTimeOriginal: string | undefined
): string | undefined {
  if (!date || typeof date === 'undefined') return undefined

  let parsedDate: Date

  if (typeof date === 'string') {
    parsedDate = new Date(date)
    // Check if the date is valid
    if (Number.isNaN(parsedDate.getTime())) return undefined
  } else {
    parsedDate = date
  }

  // Format date with timezone information from OffsetTimeOriginal
  let formattedDate: string | undefined

  if (offsetTimeOriginal) {
    // Convert the date to ISO string with the original timezone offset
    const [hours, minutes] = offsetTimeOriginal.split(':').map(Number)
    const offsetMs = (hours * 60 + (minutes || 0)) * 60 * 1000
    const utcDate = new Date(parsedDate.getTime() - offsetMs)
    formattedDate = utcDate.toISOString().replace('Z', offsetTimeOriginal)
  } else {
    formattedDate = parsedDate.toISOString()
  }

  return formattedDate
}

export function formatFstop(fstop: number | undefined): string | undefined {
  if (!fstop) return undefined

  const fstopShortened = Number.parseFloat(fstop.toFixed(1))
  return `ƒ/${fstopShortened}`
}

export function formatIso(iso: number | undefined): string | undefined {
  return iso ? `ISO ${iso}` : undefined
}

export function formatShutterSpeed(
  exposureTime: number | undefined
): string | undefined {
  if (!exposureTime || typeof exposureTime !== 'number') return undefined

  if (exposureTime >= 1) return `${Number(exposureTime.toFixed(1))}s`

  const denominator: number = Math.round(1 / exposureTime)
  return `1/${denominator}s`
}

export function formatGps(gps: ExifrGps | undefined): GpsFormatted | undefined {
  if (!gps || !gps?.latitude || !gps?.longitude) return undefined

  const latitude: number =
    gps.GPSLatitudeRef === 'S' ? -Number(gps.latitude) : Number(gps.latitude)
  const longitude: number =
    gps.GPSLongitudeRef === 'W' ? -Number(gps.longitude) : Number(gps.longitude)

  return { latitude, longitude }
}

export function formatExposure(
  exposureCompensation: number | undefined
): string | undefined {
  if (typeof exposureCompensation !== 'number') return undefined
  if (!exposureCompensation || exposureCompensation === 0) return '+/- 0 ev'

  const exposureShortened = Number.parseFloat(
    Number(exposureCompensation).toFixed(2)
  )
  let exposure: string

  if (exposureCompensation > 0) {
    exposure = `+ ${exposureShortened} ev`
  } else {
    exposure = `- ${Math.abs(exposureShortened)} ev`
  }

  return exposure
}

export function formatCameraModel(
  model: string | undefined
): string | undefined {
  if (!model) return undefined
  return model === 'FC7203' ? 'DJI Mavic Mini' : model
}
