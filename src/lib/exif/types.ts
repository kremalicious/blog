export type FastExif = {
  image?: Record<string, unknown> | undefined
  thumbnail?: Record<string, unknown> | undefined
  exif?: Record<string, unknown> | undefined
  gps?: any | undefined
  interoperability?: Record<string, unknown> | undefined
}

export type ExifFormatted = {
  date: string
  iso: string
  model: any
  fstop: string
  shutterspeed: string
  focalLength: string
  lensModel: any
  exposure: string | undefined
  gps: { latitude: number; longitude: number } | undefined
}

export type Exif = {
  image: string
  exif: ExifFormatted
  iptc: any
}
