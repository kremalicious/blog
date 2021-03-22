import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import Icon from '../../atoms/Icon'
import { postMore } from './More.module.css'

const PostMore = ({
  to,
  children
}: {
  to: string
  children: string
}): ReactElement => (
  <Link className={postMore} to={to}>
    {children}
    <Icon name="ChevronRight" />
  </Link>
)

export default PostMore
