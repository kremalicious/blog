import React, { ReactElement } from 'react'
import Icon from '../../components/core/Icon'
import styles from './More.module.css'

const PostMore = ({
  to,
  children
}: {
  to: string
  children: string
}): ReactElement => (
  <a className={styles.postMore} href={to}>
    {children}
    <Icon name="ChevronRight" />
  </a>
)

export default PostMore
