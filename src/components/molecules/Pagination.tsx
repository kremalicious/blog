import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import styles from './Pagination.module.scss'
import shortid from 'shortid'

const PageNumber = ({
  i,
  slug,
  current
}: {
  i: number
  slug: string
  current?: boolean
}) => {
  const classes = current ? styles.current : styles.number
  const link = i === 0 ? slug : `${slug}page/${i + 1}`

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
    slug: string
    currentPageNumber: number
    numPages: number
    prevPagePath?: string
    nextPagePath?: string
  }
}): ReactElement {
  const {
    slug,
    currentPageNumber,
    numPages,
    prevPagePath,
    nextPagePath
  } = pageContext
  const isFirst = currentPageNumber === 1
  const isLast = currentPageNumber === numPages

  return (
    <div className={styles.pagination}>
      <div>{!isFirst && <PrevNext prevPagePath={prevPagePath} />}</div>
      <div>
        {Array.from({ length: numPages }, (_, i) => (
          <PageNumber
            key={shortid.generate()}
            i={i}
            slug={slug}
            current={currentPageNumber === i + 1}
          />
        ))}
      </div>
      <div>{!isLast && <PrevNext nextPagePath={nextPagePath} />}</div>
    </div>
  )
}
