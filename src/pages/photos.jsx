import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Image from '../components/atoms/Image'

import styles from './photos.module.scss'
import stylesArchive from '../templates/Archive.module.scss'

const Photos = ({ data, location }) => {
  const edges = data.photos.edges

  const PhotoThumbs = edges.map(({ node }) => {
    const { title, image } = node.frontmatter
    const { slug } = node.fields

    return (
      <article className={styles.photo} key={node.id}>
        {image && (
          <Link to={slug}>
            <Image fluid={image.childImageSharp.fluid} alt={title} />
          </Link>
        )}
      </article>
    )
  })

  return (
    <Layout location={location}>
      <h1 className={stylesArchive.archiveTitle}>Photos</h1>
      <section className={styles.photos}>{PhotoThumbs}</section>
    </Layout>
  )
}

Photos.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object
}

export default Photos

export const photosQuery = graphql`
  query {
    photos: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "photo" } } }
      sort: { order: DESC, fields: [fields___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            type
            image {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 400, quality: 85) {
                  ...GatsbyImageSharpFluid_withWebp
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
