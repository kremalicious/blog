import React, { ReactElement } from 'react'
import styles from './LinkActions.module.css'
import stylesMore from './More.module.css'
import { ExternalLink, Link } from '@images/icons'

const PostLinkActions = ({
  linkurl,
  slug
}: {
  linkurl?: string
  slug: string
}): ReactElement => (
  <div className={styles.postLinkActions}>
    <a className={stylesMore.postMore} href={linkurl}>
      Go to source <ExternalLink />
    </a>
    <a href={slug} rel="tooltip" title="Permalink">
      <Link />
    </a>
  </div>
)

export default PostLinkActions
