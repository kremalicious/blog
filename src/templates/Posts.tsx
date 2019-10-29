import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostImage from './Post/PostImage'
import PostTitle from './Post/PostTitle'
import PostLead from './Post/PostLead'
import PostContent from './Post/PostContent'
import PostMore from './Post/PostMore'
import PostLinkActions from './Post/PostLinkActions'
import SEO from '../components/atoms/SEO'
import Pagination from '../components/molecules/Pagination'
import Featured from '../components/molecules/Featured'
import styles from './Posts.module.scss'
import stylesPost from './Post/index.module.scss'
import { Post } from '../@types/Post'

export default function Posts({
  data,
  location,
  pageContext
}: {
  data: { allMarkdownRemark: { edges: [{ node: Post }] } }
  location: Location
  pageContext: {
    tag: string
    currentPageNumber: number
    numPages: number
    nextPage: number
  }
}) {
  const edges = data.allMarkdownRemark.edges
  const { tag, currentPageNumber, numPages, nextPage } = pageContext

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
            <div className={stylesPost.imageWrap}>
              <PostImage
                title={type === 'photo' ? title : null}
                fluid={image.childImageSharp.fluid}
                alt={title}
                original={image.childImageSharp.original}
              />
            </div>
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
    <Layout location={location}>
      <SEO />
      {location.pathname === '/' && <Featured />}
      {tag && <h1 className={styles.archiveTitle}>#{tag}</h1>}
      {currentPageNumber > 1 && (
        <h1
          className={styles.archiveTitle}
        >{`Page ${currentPageNumber} / ${numPages}`}</h1>
      )}
      {PostsList}
      {nextPage && nextPage > 1 && <Pagination pageContext={pageContext} />}
    </Layout>
  )
}

export const indexQuery = graphql`
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
