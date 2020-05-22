import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import stylesPostMore from './More.module.scss'
import styles from './LinkActions.module.scss'
import Icon from '../../atoms/Icon'

const PostLinkActions = ({
  linkurl,
  slug
}: {
  linkurl?: string
  slug: string
}): ReactElement => (
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
