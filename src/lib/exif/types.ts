import type { Tags } from 'exiftool-vendored'

export interface ExitToolTags extends Tags {
  // set by iPhone and read out by exiftools but missing in exiftool typings
  // biome-ignore lint/style/useNamingConvention: external library
  ExposureCompensation?: number
}

export type Gps = {
  latitude: number
  longitude: number
}

export type ExifFormatted = {
  date?: string
  iso?: string
  model?: string
  fstop?: string
  shutterspeed?: string
  focalLength?: string
  lensModel?: string
  exposure?: string
  gps?: Gps
}

export type IptcFormatted = {
  title?: string
  caption?: string
  keywords?: string[]
}

export type ImageMetadataFormatted = {
  exif: ExifFormatted
  iptc: IptcFormatted
}
