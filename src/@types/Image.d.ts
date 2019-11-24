import { FixedObject, FluidObject } from 'gatsby-image'

export interface ImageProps {
  title?: string
  fluid?: FluidObject
  fixed?: FixedObject
  alt?: string
  original?: { src: string }
}

export interface ImageNode {
  childImageSharp: ImageProps
  fields: {
    exif: Exif
  }
}

export interface ExifFormatted {
  iso: string
  model: string
  fstop: string
  shutterspeed: string
  focalLength: string
  lensModel: string
  exposure: string
  gps: {
    latitude: string
    longitude: string
  }
}

export interface Exif {
  formatted?: ExifFormatted
  exif?: any
  image?: any
  thumbnail?: any
  gps?: any
  iptc?: any
}
