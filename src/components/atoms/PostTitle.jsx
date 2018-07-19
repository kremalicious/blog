import React from 'react'
import PropTypes from 'prop-types'
import styles from './PostTitle.module.scss'

const PostTitle = ({ type, linkurl, title }) =>
  type === 'link' ? (
    <h1
      className={[styles.hentry__title, styles.hentry__title__link].join(' ')}
    >
      <a href={linkurl} title={`Go to source: ${linkurl}`}>
        {title}
      </a>
    </h1>
  ) : (
    <h1 className={styles.hentry__title}>{title}</h1>
  )

PostTitle.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  linkurl: PropTypes.string
}

export default PostTitle
