import React, { ReactElement } from 'react'
import { Link, graphql } from 'gatsby'
import { Post } from '../../@types/Post'
import Pagination from '../molecules/Pagination'
import Featured from '../molecules/Featured'
import PostTitle from './Post/Title'
import PostLead from './Post/Lead'
import PostContent from './Post/Content'
import PostMore from './Post/More'
import PostLinkActions from './Post/LinkActions'
import SEO from '../atoms/SEO'
import styles from './Posts.module.scss'
import { Image } from '../atoms/Image'

export default function Posts({
  data,
  location,
  pageContext
}: {
  data: any
  location: Location
  pageContext: {
    tag: string
    slug: string
    currentPageNumber: number
    numPages: number
  }
}): ReactElement {
  const edges = data.allMarkdownRemark.edges
  const { tag, currentPageNumber, numPages } = pageContext

  const PostsList = edges.map(({ node }: { node: Post }) => {
    const { type, linkurl, title, image } = node.frontmatter
    const { slug } = node.fields

    return (
      <article className={styles.hentry} key={node.id}>
        {type !== 'photo' && (
          <PostTitle type={type} slug={slug} linkurl={linkurl} title={title} />
        )}

        {image && (
          <Link to={slug} title={title}>
            <Image
              title={type === 'photo' ? title : null}
              fluid={image.childImageSharp.fluid}
              alt={title}
              original={image.childImageSharp.original}
            />
          </Link>
        )}

        {type === 'post' && (
          <>
            <PostLead post={node} index />
            <PostMore to={slug}>Continue Reading</PostMore>
          </>
        )}

        {type === 'link' && (
          <>
            <PostContent post={node} />
            <PostLinkActions slug={slug} linkurl={linkurl} />
          </>
        )}
      </article>
    )
  })

  return (
    <>
      <SEO />
      {location.pathname === '/' && <Featured />}
      {tag && (
        <h1 className={styles.archivetitle}>
          <span>#</span>
          {tag}
        </h1>
      )}
      {numPages > 1 && currentPageNumber > 1 && (
        <h2
          className={styles.paginationTitle}
        >{`Page ${currentPageNumber} / ${numPages}`}</h2>
      )}
      {PostsList}
      {numPages > 1 && <Pagination pageContext={pageContext} />}
    </>
  )
}

export const postsQuery = graphql`
  query($tag: String, $skip: Int, $limit: Int) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $tag } } }
      sort: { order: DESC, fields: [fields___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          html
          excerpt(pruneLength: 250)
          frontmatter {
            title
            type
            linkurl
            image {
              childImageSharp {
                ...ImageFluid
              }
            }
            tags
          }
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
