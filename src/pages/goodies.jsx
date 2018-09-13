import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Image from '../components/atoms/Image'

import styles from './goodies.module.scss'

const Goodies = ({ data, location }) => {
  const edges = data.goodies.edges

  const GoodiesThumbs = edges.map(({ node }) => {
    const { title, image } = node.frontmatter
    const { slug } = node.fields

    return (
      <article className={styles.goodie} key={node.id}>
        {image && (
          <Link to={slug}>
            <h1 className={styles.title}>{title}</h1>
            <figure className={styles.image}>
              <Image fluid={image.childImageSharp.fluid} alt={title} />
            </figure>
          </Link>
        )}
      </article>
    )
  })

  return (
    <Layout location={location}>
      <h1 className={styles.pageTitle}>Goodies</h1>
      <section className={styles.goodies}>{GoodiesThumbs}</section>
    </Layout>
  )
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
