import React from 'react'
import { graphql } from 'gatsby'
import Img, { FixedObject, FluidObject } from 'gatsby-image'
import styles from './Image.module.scss'

export default function Image({
  fluid,
  fixed,
  alt
}: {
  fluid?: FluidObject
  fixed?: FixedObject
  alt: string
}) {
  return (
    <Img
      className={styles.imageWrap}
      backgroundColor="#dfe8ef"
      fluid={fluid}
      fixed={fixed}
      alt={alt}
    />
  )
}

export const imageSizeDefault = graphql`
  fragment ImageFluid on ImageSharp {
    fluid(maxWidth: 940, quality: 85) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`

export const imageSizeThumb = graphql`
  fragment ImageFluidThumb on ImageSharp {
    fluid(maxWidth: 200, maxHeight: 85, quality: 85, cropFocus: CENTER) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`
