import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import { PageContext } from '../@types/Post'
import Icon from './core/Icon'
import styles from './Pagination.module.css'

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
}): JSX.Element {
  const link = prevPagePath || nextPagePath
  const rel = prevPagePath ? 'prev' : 'next'
  const title = prevPagePath ? 'Newer Posts' : 'Older Posts'

  return (
    <Link to={link} rel={rel} title={title} className={styles.number}>
      {prevPagePath ? (
        <Icon name="ChevronLeft" />
      ) : (
        <Icon name="ChevronRight" />
      )}
    </Link>
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
