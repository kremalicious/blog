//
// Format EXIF data
//
import type { ExifDateTime, Tags } from 'exiftool-vendored'
import type {
  ExifFormatted,
  ExitToolTags,
  Gps,
  ImageMetadataFormatted,
  IptcFormatted
} from './types.ts'

export function formatImageMetadata(
  metadata: ExitToolTags | undefined
): ImageMetadataFormatted | undefined {
  if (!metadata) return undefined

  const exif: ExifFormatted = {
    date: formatDate(
      metadata.DateTimeOriginal || metadata.CreateDate,
      metadata.OffsetTimeOriginal
    ),
    iso: formatIso(metadata.ISO),
    model: formatCameraModel(metadata.Model),
    fstop: formatFstop(metadata.FNumber),
    shutterspeed: metadata.ShutterSpeed
      ? `${metadata.ShutterSpeed}s`
      : undefined,
    focalLength: metadata.FocalLengthIn35mmFormat
      ? metadata.FocalLengthIn35mmFormat
      : undefined,
    lensModel: metadata.LensModel ? metadata.LensModel : undefined,
    exposure: formatExposure(metadata.ExposureCompensation),
    gps: formatGps(metadata)
  }

  const iptc: IptcFormatted = {
    title: metadata.ObjectName ? metadata.ObjectName : undefined,
    caption: metadata['Caption-Abstract']
      ? metadata['Caption-Abstract']
      : undefined,
    keywords: Array.isArray(metadata.Keywords)
      ? metadata.Keywords
      : metadata.Keywords
        ? [metadata.Keywords]
        : []
  }

  return { exif, iptc }
}

export function formatDate(
  date: string | ExifDateTime | Date | undefined,
  offsetTimeOriginal?: string
): string | undefined {
  if (!date) return undefined

  // ExifDateTime: use toISOString if available
  if (
    typeof date === 'object' &&
    'toISOString' in date &&
    typeof date.toISOString === 'function'
  )
    return date.toISOString()

  // Parse string or Date
  const parsedDate: Date =
    typeof date === 'string'
      ? new Date(date)
      : date instanceof Date
        ? date
        : (undefined as never)

  if (!parsedDate || Number.isNaN(parsedDate.getTime())) return undefined

  // Validate offset
  if (offsetTimeOriginal && /^[+-]\d{2}:\d{2}$/.test(offsetTimeOriginal)) {
    // Remove Z and append offset
    return parsedDate.toISOString().replace('Z', offsetTimeOriginal)
  }

  return parsedDate.toISOString()
}

export function formatFstop(fstop: number | undefined): string | undefined {
  if (!fstop) return undefined

  const fstopShortened = Number.parseFloat(fstop.toFixed(2))
  return `ƒ/${fstopShortened}`
}

export function formatIso(iso: number | undefined): string | undefined {
  return iso ? `ISO ${iso}` : undefined
}

export function formatGps(metadata: Tags): Gps | undefined {
  if (!metadata.GPSLatitude || !metadata.GPSLongitude) return undefined

  const latitude: number = Number(metadata.GPSLatitude)
  const longitude: number = Number(metadata.GPSLongitude)

  return { latitude, longitude }
}

export function formatExposure(
  exposureValue: number | string | undefined
): string | undefined {
  if (exposureValue === undefined) return undefined

  const expValue =
    typeof exposureValue === 'string'
      ? Number.parseFloat(exposureValue)
      : exposureValue

  if (expValue === 0) return '+/- 0 ev'

  const exposureShortened = Number.parseFloat(expValue.toFixed(2))

  if (expValue > 0) {
    return `+ ${exposureShortened} ev`
  }

  return `- ${Math.abs(exposureShortened)} ev`
}

export function formatCameraModel(
  model: string | undefined
): string | undefined {
  if (!model) return undefined
  return model === 'FC7203' ? 'DJI Mavic Mini' : model
}
