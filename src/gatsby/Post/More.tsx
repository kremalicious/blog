import React, { ReactElement } from 'react'
import { ChevronRight } from '@images/icons'
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
    <ChevronRight />
  </a>
)

export default PostMore
