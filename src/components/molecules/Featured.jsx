import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Image from '../atoms/Image'
import styles from './Featured.module.scss'

const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300, maxHeight: 130, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
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

const Featured = () => (
  <StaticQuery
    query={query}
    render={data => (
      <div className={styles.featured}>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const { title, image } = node.frontmatter
          const { slug } = node.fields

          return (
            <article className={styles.featuredItem} key={node.id}>
              <Link to={slug}>
                <Image fluid={image.childImageSharp.fluid} alt={title} />
                <h1 className={styles.featuredTitle}>{title}</h1>
              </Link>
            </article>
          )
        })}
      </div>
    )}
  />
)

export default Featured
