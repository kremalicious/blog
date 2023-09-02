import React, { ReactElement } from 'react'
import styles from './Pagination.module.css'
import { ChevronLeft, ChevronRight } from '@images/icons'

function PageNumber({
  i,
  slug,
  current
}: {
  i: number
  slug: string
  current?: boolean
}): JSX.Element {
  const classes = current ? styles.current : styles.number
  const link = i === 0 ? slug : `${slug}page/${i + 1}`

  return (
    <a className={classes} href={link}>
      {i + 1}
    </a>
  )
}

function PrevNext({
  prevPagePath,
  nextPagePath
}: {
  prevPagePath?: string
  nextPagePath?: string
}): JSX.Element {
  const link = prevPagePath || nextPagePath
  const rel = prevPagePath ? 'prev' : 'next'
  const title = prevPagePath ? 'Newer Posts' : 'Older Posts'

  return (
    <a href={link} rel={rel} title={title} className={styles.number}>
      {prevPagePath ? <ChevronLeft /> : <ChevronRight />}
    </a>
  )
}

export default function Pagination({
  pageContext
}: {
  pageContext: PageContext
}): ReactElement {
  const { slug, currentPageNumber, numPages, prevPagePath, nextPagePath } =
    pageContext
  const isFirst = currentPageNumber === 1
  const isLast = currentPageNumber === numPages

  return (
    <div className={styles.pagination}>
      {!isFirst && <PrevNext prevPagePath={prevPagePath} />}
      {Array.from({ length: numPages }, (_, i) => (
        <PageNumber
          key={i}
          i={i}
          slug={slug}
          current={currentPageNumber === i + 1}
        />
      ))}
      {!isLast && <PrevNext nextPagePath={nextPagePath} />}
    </div>
  )
}
