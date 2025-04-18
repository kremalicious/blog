export interface ExifrIptc {
  // biome-ignore lint/style/useNamingConvention: external library
  ApplicationRecordVersion?: string
  // biome-ignore lint/style/useNamingConvention: external library
  DigitalCreationTime?: string
  // biome-ignore lint/style/useNamingConvention: external library
  DigitalCreationDate?: string
  // biome-ignore lint/style/useNamingConvention: external library
  ObjectName?: string
  // biome-ignore lint/style/useNamingConvention: external library
  DateCreated?: string
  // biome-ignore lint/style/useNamingConvention: external library
  TimeCreated?: string
  // biome-ignore lint/style/useNamingConvention: external library
  Caption?: string
  // biome-ignore lint/style/useNamingConvention: external library
  Creator?: string
  'By-line'?: string
  // biome-ignore lint/style/useNamingConvention: external library
  CopyrightNotice?: string
  // biome-ignore lint/style/useNamingConvention: external library
  Keywords?: string[]
}

export interface ExifrExif {
  // biome-ignore lint/style/useNamingConvention: external library
  ExposureTime?: number
  // biome-ignore lint/style/useNamingConvention: external library
  FNumber?: number
  // biome-ignore lint/style/useNamingConvention: external library
  ExposureProgram?: string
  // biome-ignore lint/style/useNamingConvention: external library
  ISO?: number
  // biome-ignore lint/style/useNamingConvention: external library
  ExifVersion?: string
  // biome-ignore lint/style/useNamingConvention: external library
  DateTimeOriginal?: Date
  // biome-ignore lint/style/useNamingConvention: external library
  CreateDate?: Date
  // biome-ignore lint/style/useNamingConvention: external library
  OffsetTime?: string
  // biome-ignore lint/style/useNamingConvention: external library
  OffsetTimeOriginal?: string
  // biome-ignore lint/style/useNamingConvention: external library
  OffsetTimeDigitized?: string
  // biome-ignore lint/style/useNamingConvention: external library
  ComponentsConfiguration?: Uint8Array
  // biome-ignore lint/style/useNamingConvention: external library
  ShutterSpeedValue?: number
  // biome-ignore lint/style/useNamingConvention: external library
  ApertureValue?: number
  // biome-ignore lint/style/useNamingConvention: external library
  BrightnessValue?: number
  // biome-ignore lint/style/useNamingConvention: external library
  ExposureCompensation?: number
  // biome-ignore lint/style/useNamingConvention: external library
  MeteringMode?: string
  // biome-ignore lint/style/useNamingConvention: external library
  Flash?: string
  // biome-ignore lint/style/useNamingConvention: external library
  FocalLength?: number
  // biome-ignore lint/style/useNamingConvention: external library
  SubjectArea?: Uint16Array
  // biome-ignore lint/style/useNamingConvention: external library
  SubSecTime?: string
  // biome-ignore lint/style/useNamingConvention: external library
  SubSecTimeOriginal?: string
  // biome-ignore lint/style/useNamingConvention: external library
  SubSecTimeDigitized?: string
  // biome-ignore lint/style/useNamingConvention: external library
  FlashpixVersion?: string
  // biome-ignore lint/style/useNamingConvention: external library
  ColorSpace?: number
  // biome-ignore lint/style/useNamingConvention: external library
  ExifImageWidth?: number
  // biome-ignore lint/style/useNamingConvention: external library
  ExifImageHeight?: number
  // biome-ignore lint/style/useNamingConvention: external library
  SensingMethod?: string
  // biome-ignore lint/style/useNamingConvention: external library
  SceneType?: string
  // biome-ignore lint/style/useNamingConvention: external library
  ExposureMode?: string
  // biome-ignore lint/style/useNamingConvention: external library
  WhiteBalance?: string
  // biome-ignore lint/style/useNamingConvention: external library
  FocalLengthIn35mmFormat?: number
  // biome-ignore lint/style/useNamingConvention: external library
  SceneCaptureType?: string
  // biome-ignore lint/style/useNamingConvention: external library
  LensInfo?: number[]
  // biome-ignore lint/style/useNamingConvention: external library
  LensMake?: string
  // biome-ignore lint/style/useNamingConvention: external library
  LensModel?: string
  // biome-ignore lint/style/useNamingConvention: external library
  CompositeImage?: string
}

export interface ExifrGps {
  // biome-ignore lint/style/useNamingConvention: external library
  GPSLatitudeRef?: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSLatitude?: number[]
  // biome-ignore lint/style/useNamingConvention: external library
  GPSLongitudeRef?: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSLongitude?: number[]
  // biome-ignore lint/style/useNamingConvention: external library
  GPSAltitudeRef?: Uint8Array
  // biome-ignore lint/style/useNamingConvention: external library
  GPSAltitude?: number
  // biome-ignore lint/style/useNamingConvention: external library
  GPSTimeStamp?: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSSpeedRef?: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSSpeed?: number
  // biome-ignore lint/style/useNamingConvention: external library
  GPSImgDirectionRef?: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSImgDirection?: number
  // biome-ignore lint/style/useNamingConvention: external library
  GPSDestBearingRef?: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSDestBearing?: number
  // biome-ignore lint/style/useNamingConvention: external library
  GPSDateStamp?: string
  // biome-ignore lint/style/useNamingConvention: external library
  GPSHPositioningError?: number
  latitude?: number
  longitude?: number
}

export interface ExifrIfd0 {
  // biome-ignore lint/style/useNamingConvention: external library
  Make?: string
  // biome-ignore lint/style/useNamingConvention: external library
  Model?: string
  // biome-ignore lint/style/useNamingConvention: external library
  Orientation?: string
  // biome-ignore lint/style/useNamingConvention: external library
  XResolution?: number
  // biome-ignore lint/style/useNamingConvention: external library
  YResolution?: number
  // biome-ignore lint/style/useNamingConvention: external library
  ResolutionUnit?: string
  // biome-ignore lint/style/useNamingConvention: external library
  Software?: string
  // biome-ignore lint/style/useNamingConvention: external library
  ModifyDate?: Date
  // biome-ignore lint/style/useNamingConvention: external library
  HostComputer?: string
  // biome-ignore lint/style/useNamingConvention: external library
  TileWidth?: number
  // biome-ignore lint/style/useNamingConvention: external library
  TileLength?: number
  // biome-ignore lint/style/useNamingConvention: external library
  YCbCrPositioning?: number
}

export interface ExifrMetadata {
  ifd0?: ExifrIfd0
  iptc?: ExifrIptc
  exif?: ExifrExif
  gps?: ExifrGps
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
