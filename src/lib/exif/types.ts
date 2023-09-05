export type FastExif = {
  image?: Record<string, unknown> | undefined
  thumbnail?: Record<string, unknown> | undefined
  exif?: Record<string, unknown> | undefined
  gps?: Record<string, unknown> | undefined
  interoperability?: Record<string, unknown> | undefined
}

export type ExifFormatted = {
  iso: string
  model: any
  fstop: string
  shutterspeed: string
  focalLength: string
  lensModel: any
  exposure: string | undefined
  gps: { latitude: number | undefined; longitude: number | undefined }
}

export type Exif = {
  image: string
  exif: ExifFormatted
  iptc: any
}
