import React from 'react'
import { Link } from 'gatsby'
import shortid from 'shortid'
import styles from './Pagination.module.scss'

function PageNumber({ i, current }: { i: number; current?: boolean }) {
  const classes = current ? styles.current : styles.number
  const link = i === 0 ? '' : `/page/${i + 1}`

  return (
    <Link className={classes} to={link}>
      {i + 1}
    </Link>
  )
}

function PrevNext({
  prevPagePath,
  nextPagePath
}: {
  prevPagePath?: string
  nextPagePath?: string
}) {
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

  return (
    <div className={styles.pagination}>
      <div>{!isFirst && <PrevNext prevPagePath={prevPagePath} />}</div>
      <div>
        {Array.from({ length: numPages }, (_, i) => (
          <PageNumber
            key={shortid.generate()}
            i={i}
            current={currentPageNumber === i + 1}
          />
        ))}
      </div>
      <div>{!isLast && <PrevNext nextPagePath={nextPagePath} />}</div>
    </div>
  )
}
