import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import { postMore } from './More.module.css'
import { postLinkActions } from './LinkActions.module.css'
import Icon from '../../atoms/Icon'

const PostLinkActions = ({
  linkurl,
  slug
}: {
  linkurl?: string
  slug: string
}): ReactElement => (
  <aside className={postLinkActions}>
    <a className={postMore} href={linkurl}>
      Go to source <Icon name="ExternalLink" />
    </a>
    <Link to={slug} rel="tooltip" title="Permalink">
      <Icon name="Link" />
    </Link>
  </aside>
)

export default PostLinkActions
