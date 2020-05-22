import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { ImageProps } from '../../@types/Image'
import styles from './Image.module.scss'

export const Image = ({
  title,
  fluid,
  fixed,
  alt,
  original
}: ImageProps): ReactElement => (
  <figure className={styles.image} data-original={original && original.src}>
    <Img backgroundColor="transparent" fluid={fluid} fixed={fixed} alt={alt} />
    {title && <figcaption className={styles.imageTitle}>{title}</figcaption>}
  </figure>
)

export const imageSizeDefault = graphql`
  fragment ImageFluid on ImageSharp {
    original {
      src
    }
    fluid(maxWidth: 940, quality: 85) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`

export const imageSizeThumb = graphql`
  fragment ImageFluidThumb on ImageSharp {
    original {
      src
    }
    fluid(maxWidth: 400, maxHeight: 170, quality: 85, cropFocus: CENTER) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`
