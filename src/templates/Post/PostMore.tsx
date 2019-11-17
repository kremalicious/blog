import React from 'react'
import { Link } from 'gatsby'
import Icon from '../../components/atoms/Icon'
import styles from './PostMore.module.scss'

const PostMore = ({ to, children }: { to: string; children: string }) => (
  <Link className={styles.postMore} to={to}>
    {children}
    <Icon name="ChevronRight" />
  </Link>
)

export default PostMore
