import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { ImageProps } from '../../@types/Image'
import * as styles from './Image.module.css'

export const Image = ({
  title,
  fluid,
  fixed,
  alt,
  original,
  className
}: ImageProps): ReactElement => (
  <figure
    className={`${styles.image} ${className ? className : ''}`}
    data-original={original && original.src}
  >
    <Img
      backgroundColor="transparent"
      fluid={fluid}
      fixed={fixed}
      alt={alt}
      imgStyle={{ objectFit: 'contain' }}
    />
    {title && <figcaption className={styles.imageTitle}>{title}</figcaption>}
  </figure>
)

export const imageSizeDefault = graphql`
  fragment ImageFluid on ImageSharp {
    original {
      src
    }
    fluid(maxWidth: 950, quality: 85) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`

export const imageSizeThumb = graphql`
  fragment ImageFluidThumb on ImageSharp {
    original {
      src
    }
    fluid(maxWidth: 420, maxHeight: 140, quality: 85, cropFocus: CENTER) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`

export const photoSizeThumb = graphql`
  fragment PhotoFluidThumb on ImageSharp {
    original {
      src
    }
    fluid(maxWidth: 300, maxHeight: 300, quality: 85, cropFocus: CENTER) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`
