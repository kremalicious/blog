import React, { ReactElement } from 'react'
import { Image } from '../core/Image'
import PostTitle from '../layouts/Post/Title'
import styles from './PostTeaser.module.css'

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
  post: Queries.PostTeaserFragment
  toggleSearch?: () => void
  hideDate?: boolean
}): ReactElement {
  const { image, title, updated } = post.frontmatter
  const { slug, date } = post.fields

  return (
    <a
      className={styles.post}
      href={slug}
      onClick={toggleSearch && toggleSearch}
    >
      {image ? (
        <Image
          image={(image as any).childImageSharp.gatsbyImageData}
          alt={title}
        />
      ) : (
        <span className={styles.empty} />
      )}

      <PostTitle
        title={title}
        date={hideDate ? null : date}
        updated={updated}
        className={styles.title}
      />
    </a>
  )
}
