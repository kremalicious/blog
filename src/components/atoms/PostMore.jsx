import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styles from './PostMore.module.scss'
import { ReactComponent as Caret } from '../../images/chevron-right.svg'

const PostMore = ({ to, children }) => (
  <Link className={styles.postMore} to={to}>
    {children}
    <Caret />
  </Link>
)

PostMore.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default PostMore
