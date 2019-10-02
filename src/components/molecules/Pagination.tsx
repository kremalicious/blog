import React from 'react'
import { Link } from 'gatsby'
import styles from './Pagination.module.scss'

const PageNumber = ({ i, current }: { i: number; current?: boolean }) => (
  <Link
    className={current ? styles.current : styles.number}
    to={i === 0 ? '' : `/page/${i + 1}`}
  >
    {i + 1}
  </Link>
)

const PrevNext = ({
  prevPagePath,
  nextPagePath
}: {
  prevPagePath?: string
  nextPagePath?: string
}) => {
  const link = prevPagePath || nextPagePath
  const rel = prevPagePath ? 'prev' : 'next'
  const title = prevPagePath ? 'Newer Posts' : 'Older Posts'

  return (
    <Link to={link} rel={rel} title={title}>
      {prevPagePath ? '←' : '→'}
    </Link>
  )
}

export default function Pagination({
  pageContext
}: {
  pageContext: {
    currentPageNumber: number
    numPages: number
    prevPage?: number
    nextPage?: number
  }
}) {
  const { currentPageNumber, numPages, prevPage, nextPage } = pageContext
  const isFirst = currentPageNumber === 1
  const isLast = currentPageNumber === numPages
  const prevPagePath = currentPageNumber === 2 ? '/' : `/page/${prevPage}`
  const nextPagePath = `/page/${nextPage}`

  return nextPage && nextPage > 1 ? (
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
