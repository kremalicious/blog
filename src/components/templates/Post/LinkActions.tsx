import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import * as stylesMore from './More.module.css'
import * as styles from './LinkActions.module.css'
import Icon from '../../atoms/Icon'

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
    <Link to={slug} rel="tooltip" title="Permalink">
      <Icon name="Link" />
    </Link>
  </div>
)

export default PostLinkActions
