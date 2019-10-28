import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './Image.module.scss'
import { ImageProps } from '../../@types/Image'

export const Image = ({ fluid, fixed, alt }: ImageProps) => (
  <Img
    className={styles.imageWrap}
    backgroundColor="transparent"
    fluid={fluid}
    fixed={fixed}
    alt={alt}
  />
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
