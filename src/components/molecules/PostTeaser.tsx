import React, { ReactElement } from 'react'
import { Link, graphql } from 'gatsby'
import { Image } from '../atoms/Image'
import styles from './PostTeaser.module.scss'
import { Post } from '../../@types/Post'

export const postTeaserQuery = graphql`
  fragment PostTeaser on MarkdownRemark {
    id
    fileAbsolutePath
    frontmatter {
      title
      image {
        childImageSharp {
          ...ImageFluidThumb
        }
      }
    }
    fields {
      slug
    }
  }
`

export default function PostTeaser({
  post,
  toggleSearch
}: {
  post: Partial<Post>
  toggleSearch?: () => void
}): ReactElement {
  const { image, title } = post.frontmatter
  const { slug } = post.fields

  return (
    <Link
      className={styles.post}
      to={slug}
      onClick={toggleSearch && toggleSearch}
    >
      {image ? (
        <Image fluid={image.childImageSharp.fluid} alt={title} />
      ) : (
        <div className={styles.empty} />
      )}
      <h4 className={styles.postTitle}>{title}</h4>
    </Link>
  )
}
