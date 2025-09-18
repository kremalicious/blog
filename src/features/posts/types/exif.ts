export interface ExifrIptc {
  ApplicationRecordVersion?: string
  DigitalCreationTime?: string
  DigitalCreationDate?: string
  ObjectName?: string
  DateCreated?: string
  TimeCreated?: string
  Caption?: string
  Creator?: string
  'By-line'?: string
  CopyrightNotice?: string
  Keywords?: string[]
}

export interface ExifrExif {
  ExposureTime?: number
  FNumber?: number
  ExposureProgram?: string
  ISO?: number
  ExifVersion?: string
  DateTimeOriginal?: Date
  CreateDate?: Date
  OffsetTime?: string
  OffsetTimeOriginal?: string
  OffsetTimeDigitized?: string
  ComponentsConfiguration?: Uint8Array
  ShutterSpeedValue?: number
  ApertureValue?: number
  BrightnessValue?: number
  ExposureCompensation?: number
  MeteringMode?: string
  Flash?: string
  FocalLength?: number
  SubjectArea?: Uint16Array
  SubSecTime?: string
  SubSecTimeOriginal?: string
  SubSecTimeDigitized?: string
  FlashpixVersion?: string
  ColorSpace?: number
  ExifImageWidth?: number
  ExifImageHeight?: number
  SensingMethod?: string
  SceneType?: string
  ExposureMode?: string
  WhiteBalance?: string
  FocalLengthIn35mmFormat?: number
  SceneCaptureType?: string
  LensInfo?: number[]
  LensMake?: string
  LensModel?: string
  CompositeImage?: string
}

export interface ExifrGps {
  GPSLatitudeRef?: string
  GPSLatitude?: number[]
  GPSLongitudeRef?: string
  GPSLongitude?: number[]
  GPSAltitudeRef?: Uint8Array
  GPSAltitude?: number
  GPSTimeStamp?: string
  GPSSpeedRef?: string
  GPSSpeed?: number
  GPSImgDirectionRef?: string
  GPSImgDirection?: number
  GPSDestBearingRef?: string
  GPSDestBearing?: number
  GPSDateStamp?: string
  GPSHPositioningError?: number
  latitude?: number
  longitude?: number
}

export interface ExifrIfd0 {
  Make?: string
  Model?: string
  Orientation?: string
  XResolution?: number
  YResolution?: number
  ResolutionUnit?: string
  Software?: string
  ModifyDate?: Date
  HostComputer?: string
  TileWidth?: number
  TileLength?: number
  YCbCrPositioning?: number
}

export interface ExifrDc {
  title?: { value?: string; lang?: 'x-default' }
  description?: { value?: string; lang?: 'x-default' }
}

export interface ExifrMetadata {
  ifd0?: ExifrIfd0
  iptc?: ExifrIptc
  exif?: ExifrExif
  gps?: ExifrGps
  dc?: ExifrDc
}

export type GpsFormatted = {
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
}

export type IptcFormatted = {
  title?: string
  caption?: string
  keywords?: string[]
}

export type ImageMetadataFormatted = {
  exif: ExifFormatted
  iptc: IptcFormatted
  gps?: GpsFormatted
}
