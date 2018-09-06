import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styles from './Pagination.module.scss'

const Pagination = ({ pageContext }) => {
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <div className={styles.pagination}>
      {previousPagePath ? (
        <Link className={styles.paginationLink} to={previousPagePath}>
          &laquo; Newer Posts
        </Link>
      ) : null}
      {nextPagePath ? (
        <Link className={styles.paginationLink} to={nextPagePath}>
          Older Posts &raquo;
        </Link>
      ) : null}
    </div>
  )
}

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired
}

export default Pagination
