import { FluidObject } from 'gatsby-image'

export interface PostMetadataFields {
  slug: string
  date: string
  githubLink: string
}

export interface PostMetadataImageExif {
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

export interface PostMetadataImage {
  childImageSharp: { fluid: FluidObject }
  fields: {
    exif: PostMetadataImageExif
  }
}

export interface PostMetadataFrontmatter {
  type?: string
  title: string
  description?: string
  image?: PostMetadataImage
  author?: string
  updated?: string
  tags?: string[]
  linkurl?: string
  style?: {
    publicURL?: string
  }
  changelog?: string
}

export interface PostMetadata {
  id?: string
  html?: string
  excerpt?: string
  frontmatter: PostMetadataFrontmatter
  fields?: PostMetadataFields
  rawMarkdownBody?: string
  fileAbsolutePath?: string
}
