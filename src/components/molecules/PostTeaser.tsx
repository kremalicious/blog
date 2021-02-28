import React, { ReactElement } from 'react'
import { Link, graphql } from 'gatsby'
import { Image } from '../atoms/Image'
import { Post } from '../../@types/Post'
import PostTitle from '../templates/Post/Title'
import styles from './PostTeaser.module.scss'
import Time from '../atoms/Time'

export const postTeaserQuery = graphql`
  fragment PostTeaser on MarkdownRemark {
    id
    fileAbsolutePath
    frontmatter {
      title
      linkurl
      updated
      image {
        childImageSharp {
          ...ImageFluidThumb
        }
      }
      tags
    }
    fields {
      slug
      date
      type
    }
  }
`

export default function PostTeaser({
  post,
  toggleSearch,
  hideDate
}: {
  post: Partial<Post>
  toggleSearch?: () => void
  hideDate?: boolean
}): ReactElement {
  const { image, title, updated } = post.frontmatter
  const { slug, date, type } = post.fields

  return (
    <Link
      className={styles.post}
      to={slug}
      onClick={toggleSearch && toggleSearch}
    >
      {image ? (
        <Image
          fluid={image.childImageSharp.fluid}
          alt={title}
          original={image.childImageSharp.original}
        />
      ) : (
        <span className={styles.empty} />
      )}

      <PostTitle slug={slug} title={title} className={styles.title} />
      {date && !hideDate && (
        <div className={styles.time}>
          <Time date={date} />
          {updated && ' • updated '}
          {updated && <Time date={updated} />}
        </div>
      )}
    </Link>
  )
}
