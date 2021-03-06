import React, { ReactElement } from 'react'
import { Link, graphql } from 'gatsby'
import { Image } from '../atoms/Image'
import { Post } from '../../@types/Post'
import PostTitle from '../templates/Post/Title'
import * as styles from './PostTeaser.module.css'

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
  const { slug, date } = post.fields

  return (
    <Link
      className={styles.post}
      to={slug}
      onClick={toggleSearch && toggleSearch}
    >
      {image ? (
        <Image image={image} alt={title} />
      ) : (
        <span className={styles.empty} />
      )}

      <PostTitle
        title={title}
        date={hideDate ? null : date}
        updated={updated}
        className={styles.title}
      />
    </Link>
  )
}
