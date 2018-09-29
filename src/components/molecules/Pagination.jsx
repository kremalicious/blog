import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styles from './Pagination.module.scss'

const PageNumber = ({ i, current }) => (
  <Link
    className={current ? styles.current : styles.number}
    to={i === 0 ? '' : `/page/${i + 1}`}
  >
    {i + 1}
  </Link>
)

PageNumber.propTypes = {
  i: PropTypes.number.isRequired,
  current: PropTypes.bool
}

const PrevNext = ({ prevPagePath, nextPagePath }) => {
  const link = prevPagePath || nextPagePath
  const rel = prevPagePath ? 'prev' : 'next'
  const title = prevPagePath ? 'Newer Posts' : 'Older Posts'

  return (
    <Link to={link} rel={rel} title={title}>
      {prevPagePath ? '←' : '→'}
    </Link>
  )
}

PrevNext.propTypes = {
  prevPagePath: PropTypes.string,
  nextPagePath: PropTypes.string
}

const Pagination = ({ pageContext }) => {
  const { currentPageNumber, numPages, prevPage, nextPage } = pageContext
  const isFirst = currentPageNumber === 1
  const isLast = currentPageNumber === numPages
  const prevPagePath = currentPageNumber === 2 ? '/' : `/page/${prevPage}`
  const nextPagePath = `/page/${nextPage}`

  return nextPage > 1 ? (
    <div className={styles.pagination}>
      <div>{!isFirst && <PrevNext prevPagePath={prevPagePath} />}</div>
      <div>
        {Array.from({ length: numPages }, (_, i) => (
          <PageNumber
            key={`pagination-number${i + 1}`}
            i={i}
            current={currentPageNumber === i + 1}
          />
        ))}
      </div>
      <div>{!isLast && <PrevNext nextPagePath={nextPagePath} />}</div>
    </div>
  ) : null
}

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired
}

export default Pagination
