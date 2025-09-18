import type {
  ExifFormatted,
  ExifrMetadata,
  GpsFormatted,
  ImageMetadataFormatted,
  IptcFormatted
} from '../../types'
import {
  formatCameraModel,
  formatDate,
  formatExposure,
  formatFocalLength,
  formatFstop,
  formatGps,
  formatIso,
  formatKeywords,
  formatShutterSpeed
} from './format-helpers.ts'

export function formatImageMetadata(
  metadata: ExifrMetadata | undefined
): ImageMetadataFormatted | undefined {
  if (!metadata) return undefined

  const exif: ExifFormatted = {
    date: formatDate(
      metadata.exif?.DateTimeOriginal || metadata.exif?.CreateDate,
      metadata.exif?.OffsetTimeOriginal
    ),
    iso: formatIso(metadata.exif?.ISO),
    model: formatCameraModel(metadata.ifd0?.Model),
    fstop: formatFstop(metadata.exif?.FNumber),
    shutterspeed: formatShutterSpeed(metadata.exif?.ExposureTime),
    focalLength: formatFocalLength(metadata.exif?.FocalLengthIn35mmFormat),
    lensModel: metadata.exif?.LensModel ? metadata.exif.LensModel : undefined,
    exposure: formatExposure(metadata.exif?.ExposureCompensation)
  }

  // Try IPTC first, then fall back to XMP dc:title/description
  const iptcTitle = metadata.iptc?.ObjectName
  const iptcCaption = metadata.iptc?.Caption
  const dcTitle = metadata.dc?.title?.value
  const dcDescription = metadata.dc?.description?.value

  const iptc: IptcFormatted = {
    title: iptcTitle || dcTitle || undefined,
    caption: iptcCaption || dcDescription || undefined,
    keywords: formatKeywords(metadata.iptc?.Keywords)
  }

  const gps: GpsFormatted | undefined = formatGps(metadata.gps)

  return { exif, iptc, gps }
}
