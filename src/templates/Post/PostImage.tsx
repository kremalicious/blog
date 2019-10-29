import React from 'react'
import { Image } from '../../components/atoms/Image'
import styles from './PostImage.module.scss'
import { ImageProps } from '../../@types/Image'

const PostImage = ({ title, fluid, fixed, alt, original }: ImageProps) => (
  <figure className={styles.image} data-original={original && original.src}>
    <Image fluid={fluid} fixed={fixed} alt={alt} />
    {title && <figcaption className={styles.imageTitle}>{title}</figcaption>}
  </figure>
)

export default PostImage
