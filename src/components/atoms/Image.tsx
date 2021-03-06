import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ImageProps } from '../../@types/Image'
import * as styles from './Image.module.css'

export const Image = ({
  title,
  image,
  alt,
  original,
  className
}: ImageProps): ReactElement => (
  <figure
    className={`${styles.image} ${className ? className : ''}`}
    data-original={original && original.src}
  >
     <GatsbyImage backgroundColor="transparent" image={image} alt={alt} />
    {title && <figcaption className={styles.imageTitle}>{title}</figcaption>}
  </figure>
)

export const imageSizeDefault = graphql`
  fragment ImageFluid on ImageSharp {
    original {
      src
    }
    gatsbyImageData(layout: CONSTRAINED, width: 950, quality: 85)
  }
`

export const imageSizeThumb = graphql`
  fragment ImageFluidThumb on ImageSharp {
    original {
      src
    }
    gatsbyImageData(layout: CONSTRAINED, width: 420, height: 140, quality: 85)
  }
`

export const photoSizeThumb = graphql`
  fragment PhotoFluidThumb on ImageSharp {
    original {
      src
    }
    gatsbyImageData(layout: CONSTRAINED, width: 300, height: 300, quality: 85)
  }
`
