import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import styles from './PostImage.module.scss'

const PostImage = ({ title, fluid, fixed, alt }) => (
  <figure className={styles.postImage}>
    <Image
      fluid={fluid ? fluid : null}
      fixed={fixed ? fixed : null}
      alt={alt}
    />
    {title && (
      <figcaption className={styles.postImageTitle}>{title}</figcaption>
    )}
  </figure>
)

PostImage.propTypes = {
  fluid: PropTypes.object,
  fixed: PropTypes.object,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default PostImage
