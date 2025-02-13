export type Gps = {
  latitude: number
  longitude: number
}

export type GpsFastExif = {
  // biome-ignore lint/style/useNamingConvention: external library
  GPSLatitudeRef: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSLatitude: number[]
  // biome-ignore lint/style/useNamingConvention: external library
  GPSLongitudeRef: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSLongitude: number[]
}

export type FastExif = {
  image?: Record<string, unknown> | undefined
  thumbnail?: Record<string, unknown> | undefined
  exif?: Record<string, unknown> | undefined
  gps?: GpsFastExif | undefined
  interoperability?: Record<string, unknown> | undefined
}

export type ExifFormatted = {
  date: string
  iso: string
  model: string
  fstop: string
  shutterspeed: string
  focalLength: string
  lensModel: string
  exposure: string | undefined
  gps: Gps | undefined
}

export type Exif = {
  image: string
  exif: ExifFormatted
  iptc: IptcData
}
