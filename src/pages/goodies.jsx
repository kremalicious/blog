import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import PostImage from '../components/Post/PostImage'
import Page from '../templates/Page'

import styles from './goodies.module.scss'

const Goodies = ({ data }) => {
  const edges = data.goodies.edges

  const GoodiesThumbs = edges.map(({ node }) => {
    const { title, image } = node.frontmatter
    const { slug } = node.fields

    return (
      <article className={styles.goodie} key={node.id}>
        {image && (
          <Link to={slug}>
            <h1 className={styles.title}>{title}</h1>
            <PostImage fluid={image.childImageSharp.fluid} alt={title} />
          </Link>
        )}
      </article>
    )
  })

  return <Page title="Goodies">{GoodiesThumbs}</Page>
}

Goodies.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object
}

export default Goodies

export const goodiesQuery = graphql`
  query {
    goodies: allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: "goodies" } } }
      sort: { order: DESC, fields: [fields___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                ...ImageFluid
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
