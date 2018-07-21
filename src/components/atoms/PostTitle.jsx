import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Forward from '../svg/Forward'
import styles from './PostTitle.module.scss'

const PostTitle = ({ type, linkurl, title }) => {
  const linkHostname = linkurl ? new URL(linkurl).hostname : null

  return type === 'link' ? (
    <Fragment>
      <h1
        className={[styles.hentry__title, styles.hentry__title__link].join(' ')}
      >
        <a href={linkurl} title={`Go to source: ${linkurl}`}>
          {title} <Forward />
        </a>
      </h1>
      <div className={styles.linkurl}>{linkHostname}</div>
    </Fragment>
  ) : (
    <h1 className={styles.hentry__title}>{title}</h1>
  )
}

PostTitle.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  linkurl: PropTypes.string
}

export default PostTitle
