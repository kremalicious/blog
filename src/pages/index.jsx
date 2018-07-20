import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

const IndexPage = ({ data, location }) => {
  const edges = data.allMarkdownRemark.edges
  const Posts = edges
    // .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => (
      <li key={edge.node.id}>
        <Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
      </li>
    ))

  return (
    <Layout location={location}>
      <ul>{Posts}</ul>
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default IndexPage

export const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
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
