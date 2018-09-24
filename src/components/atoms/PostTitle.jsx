import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { ReactComponent as Forward } from '../../images/forward.svg'
import styles from './PostTitle.module.scss'

const PostTitle = ({ type, slug, linkurl, title }) => {
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
  ) : slug ? (
    <h1 className={styles.hentry__title}>
      <Link to={slug}>{title}</Link>
    </h1>
  ) : (
    <h1 className={styles.hentry__title}>{title}</h1>
  )
}

PostTitle.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string,
  linkurl: PropTypes.string
}

export default PostTitle
