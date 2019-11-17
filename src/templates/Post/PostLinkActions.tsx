import React from 'react'
import { Link } from 'gatsby'
import stylesPostMore from './PostMore.module.scss'
import styles from './PostLinkActions.module.scss'
import Icon from '../../components/atoms/Icon'

const PostLinkActions = ({
  linkurl,
  slug
}: {
  linkurl?: string
  slug: string
}) => (
  <aside className={styles.postLinkActions}>
    <a className={stylesPostMore.postMore} href={linkurl}>
      Go to source <Icon name="ExternalLink" />
    </a>
    <Link to={slug} rel="tooltip" title="Permalink">
      <Icon name="Link" />
    </Link>
  </aside>
)

export default PostLinkActions
