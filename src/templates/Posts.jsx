import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostImage from '../components/atoms/PostImage'
import PostTitle from '../components/atoms/PostTitle'
import PostLead from '../components/atoms/PostLead'
import PostContent from '../components/atoms/PostContent'
import PostMore from '../components/atoms/PostMore'
import PostLinkActions from '../components/atoms/PostLinkActions'
import SEO from '../components/atoms/SEO'
import Pagination from '../components/molecules/Pagination'
import Featured from '../components/molecules/Featured'
import styles from './Posts.module.scss'

const Posts = ({ data, location, pageContext }) => {
  const edges = data.allMarkdownRemark.edges
  const { tag, previousPagePath, humanPageNumber, numberOfPages } = pageContext

  const PostsList = edges.map(({ node }) => {
    const { type, linkurl, title, image } = node.frontmatter
    const { slug } = node.fields

    return (
      <article className={styles.hentry} key={node.id}>
        {type !== 'photo' && (
          <PostTitle type={type} slug={slug} linkurl={linkurl} title={title} />
        )}

        {image && (
          <Link to={slug}>
            <PostImage
              title={type === 'photo' ? title : null}
              fluid={image.childImageSharp.fluid}
              alt={title}
            />
          </Link>
        )}

        {type === 'post' && (
          <Fragment>
            <PostLead post={node} index />
            <PostMore to={slug}>Continue Reading</PostMore>
          </Fragment>
        )}

        {type === 'link' && (
          <Fragment>
            <PostContent post={node} />
            <PostLinkActions slug={slug} linkurl={linkurl} />
          </Fragment>
        )}
      </article>
    )
  })

  return (
    <Layout location={location}>
      <SEO />
      {location.pathname === '/' && <Featured />}
      {tag && <h1 className={styles.archiveTitle}>{tag}</h1>}
      {previousPagePath && (
        <h1
          className={styles.archiveTitle}
        >{`Page ${humanPageNumber} / ${numberOfPages}`}</h1>
      )}
      {PostsList}
      <Pagination pageContext={pageContext} />
    </Layout>
  )
}

Posts.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Posts

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
