import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import styles from './Archive.module.scss'

const Archive = ({ data, location, pageContext }) => {
  let posts
  let archiveTitle

  if (pageContext.category) {
    posts = data.category.edges
    archiveTitle = pageContext.category
  } else {
    posts = data.tag.edges
    archiveTitle = pageContext.tag
  }

  const Posts = posts.map(post => (
    <li key={post.node.id}>
      <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
    </li>
  ))

  return (
    <Layout location={location}>
      <h1 className={styles.archiveTitle}>{archiveTitle}</h1>
      <ul>{Posts}</ul>
    </Layout>
  )
}

Archive.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
}

export default Archive

export const archiveQuery = graphql`
  query($tag: String!) {
    tag: allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $tag } } }
      sort: { order: DESC, fields: [fields___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
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
