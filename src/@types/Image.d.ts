import { GatsbyImageProps } from 'gatsby-plugin-image'

export interface ImageProps extends GatsbyImageProps {
  title?: string
  original?: { src: string }
  className?: string
}
