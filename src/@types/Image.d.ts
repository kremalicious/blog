import { GatsbyImageProps, IGatsbyImageData } from 'gatsby-plugin-image'

export interface ImageProps extends GatsbyImageProps {
  title?: string
  original?: { src: string }
  className?: string
}

export interface ImageNode extends IGatsbyImageData {
  fields?: {
    exif?: Exif
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
