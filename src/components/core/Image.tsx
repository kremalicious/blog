import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ImageProps } from '../../@types/Image'
import styles from './Image.module.css'

export const Image = ({
  title,
  image,
  alt,
  original,
  className
}: ImageProps): ReactElement => (
  <figure
    className={`${styles.image} ${className ? className : ''}`}
    data-original={original?.src}
  >
    <GatsbyImage image={image} alt={alt} objectFit="contain" />
    {title && <figcaption className={styles.imageTitle}>{title}</figcaption>}
  </figure>
)

export const imageSizeDefault = graphql`
  fragment ImageFluid on ImageSharp {
    original {
      src
    }
    gatsbyImageData(width: 1040)
  }
`

export const imageSizeThumb = graphql`
  fragment ImageFluidThumb on ImageSharp {
    original {
      src
    }
    gatsbyImageData(
      width: 480
      height: 180
      transformOptions: { cropFocus: CENTER }
    )
  }
`

export const photoSizeThumb = graphql`
  fragment PhotoFluidThumb on ImageSharp {
    original {
      src
    }
    gatsbyImageData(
      width: 316
      height: 316
      transformOptions: { cropFocus: CENTER }
    )
  }
`
