import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Forward from '../svg/Forward'
import Infinity from '../svg/Infinity'
import styles from './PostLinkActions.module.scss'
import stylesPostMore from './PostMore.module.scss'

const PostLinkActions = ({ linkurl, slug }) => (
  <div className={styles.postLinkActions}>
    <a className={stylesPostMore.postMore} href={linkurl}>
      Go to source <Forward />
    </a>
    <Link to={slug} rel="tooltip" title="Permalink">
      <Infinity />
    </Link>
  </div>
)

PostLinkActions.propTypes = {
  slug: PropTypes.string.isRequired,
  linkurl: PropTypes.string
}

export default PostLinkActions
