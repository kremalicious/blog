import React, { ReactElement } from 'react'
import Icon from '../../core/Icon'
import styles from './LinkActions.module.css'
import stylesMore from './More.module.css'

const PostLinkActions = ({
  linkurl,
  slug
}: {
  linkurl?: string
  slug: string
}): ReactElement => (
  <div className={styles.postLinkActions}>
    <a className={stylesMore.postMore} href={linkurl}>
      Go to source <Icon name="ExternalLink" />
    </a>
    <a href={slug} rel="tooltip" title="Permalink">
      <Icon name="Link" />
    </a>
  </div>
)

export default PostLinkActions
