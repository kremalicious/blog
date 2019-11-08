import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as Forward } from '../../images/forward.svg'
import { ReactComponent as Infinity } from '../../images/infinity.svg'
import stylesPostMore from './PostMore.module.scss'
import styles from './PostLinkActions.module.scss'

const PostLinkActions = ({
  linkurl,
  slug
}: {
  linkurl?: string
  slug: string
}) => (
  <div className={styles.postLinkActions}>
    <a className={stylesPostMore.postMore} href={linkurl}>
      Go to source <Forward />
    </a>
    <Link to={slug} rel="tooltip" title="Permalink">
      <Infinity />
    </Link>
  </div>
)

export default PostLinkActions
