import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ImageProps } from '../../@types/Image'
import { image as styleImage, imageTitle } from './Image.module.css'

export const Image = ({
  title,
  image,
  alt,
  original,
  className
}: ImageProps): ReactElement => (
  <figure
    className={`${styleImage} ${className ? className : ''}`}
    data-original={original?.src}
  >
    <GatsbyImage backgroundColor="transparent" image={image} alt={alt} />
    {title && <figcaption className={imageTitle}>{title}</figcaption>}
  </figure>
)

export const imageSizeDefault = graphql`
  fragment ImageFluid on ImageSharp {
    original {
      src
    }
    gatsbyImageData(layout: CONSTRAINED, width: 1040, quality: 85)
  }
`

export const imageSizeThumb = graphql`
  fragment ImageFluidThumb on ImageSharp {
    original {
      src
    }
    gatsbyImageData(layout: CONSTRAINED, width: 480, height: 140, quality: 85)
  }
`

export const photoSizeThumb = graphql`
  fragment PhotoFluidThumb on ImageSharp {
    original {
      src
    }
    gatsbyImageData(
      layout: CONSTRAINED
      width: 316
      height: 316
      quality: 85
      transformOptions: { cropFocus: CENTER }
    )
  }
`
