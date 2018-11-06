import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Image from '../components/atoms/Image'
import Page from '../templates/Page'

import styles from './photos.module.scss'

const Photos = ({ data }) => {
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
    <Page title="Photos" section={styles.photos}>
      {PhotoThumbs}
    </Page>
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
                fluid(
                  maxWidth: 400
                  maxHeight: 400
                  quality: 85
                  cropFocus: CENTER
                ) {
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
