import React, { ReactElement } from 'react'
import { Link, graphql } from 'gatsby'
import { Image } from '../atoms/Image'
import { Post } from '../../@types/Post'
import PostTitle from '../templates/Post/Title'
import {
  post as stylePost,
  empty,
  title as styleTitle
} from './PostTeaser.module.css'

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
      className={stylePost}
      to={slug}
      onClick={toggleSearch && toggleSearch}
    >
      {image ? (
        <Image
          image={(image as any).childImageSharp.gatsbyImageData}
          alt={title}
        />
      ) : (
        <span className={empty} />
      )}

      <PostTitle
        title={title}
        date={hideDate ? null : date}
        updated={updated}
        className={styleTitle}
      />
    </Link>
  )
}
