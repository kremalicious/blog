import React from 'react'
import Image from '../atoms/Image'
import styles from './PostImage.module.scss'
import { FluidObject, FixedObject } from 'gatsby-image'

interface PostImageProps {
  title?: string
  fluid?: FluidObject
  fixed?: FixedObject
  alt: string
}

const PostImage = ({ title, fluid, fixed, alt }: PostImageProps) => (
  <figure className={styles.postImage}>
    <Image fluid={fluid} fixed={fixed} alt={alt} />
    {title && (
      <figcaption className={styles.postImageTitle}>{title}</figcaption>
    )}
  </figure>
)

export default PostImage
