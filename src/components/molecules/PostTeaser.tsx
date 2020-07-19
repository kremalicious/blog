import React, { ReactElement } from 'react'
import { Link, graphql } from 'gatsby'
import { Image } from '../atoms/Image'
import { Post } from '../../@types/Post'
import PostTitle from '../templates/Post/Title'
import styles from './PostTeaser.module.scss'

export const postTeaserQuery = graphql`
  fragment PostTeaser on MarkdownRemark {
    id
    fileAbsolutePath
    frontmatter {
      type
      title
      linkurl
      image {
        childImageSharp {
          ...ImageFluidThumb
        }
      }
      tags
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
  const { image, title, type } = post.frontmatter
  const { slug } = post.fields

  return (
    <Link
      className={styles.post}
      to={slug}
      onClick={toggleSearch && toggleSearch}
    >
      {image && (
        <Image
          title={type === 'photo' ? title : null}
          fluid={image.childImageSharp.fluid}
          alt={title}
          original={image.childImageSharp.original}
        />
      )}

      <PostTitle slug={slug} title={title} className={styles.title} />
    </Link>
  )
}
