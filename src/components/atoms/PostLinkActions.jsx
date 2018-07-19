import React from 'react'
import PropTypes from 'prop-types'
import styles from './PostLinkActions.module.scss'

const PostLinkActions = ({ linkurl, slug }) => (
  <div className={styles.postLinkActions}>
    <a className="more-link" href={linkurl}>
      Go to source
    </a>
    <a className="more-link" href={slug} rel="tooltip" title="Permalink">
      Permalink
    </a>
  </div>
)

PostLinkActions.propTypes = {
  slug: PropTypes.string.isRequired,
  linkurl: PropTypes.string
}

export default PostLinkActions
