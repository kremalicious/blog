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

export type Exif = {
  image: string
  exif: ExifFormatted
  iptc: IptcData
}
