import React from 'react'
import { Link } from 'gatsby'
import styles from './PostMore.module.scss'
import { ReactComponent as Caret } from '../../images/chevron-right.svg'

const PostMore = ({ to, children }: { to: string; children: string }) => (
  <Link className={styles.postMore} to={to}>
    {children}
    <Caret />
  </Link>
)

export default PostMore
