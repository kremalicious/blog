import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from '../components/atoms/Image'
import Page from '../templates/Page'

import styles from './photos.module.scss'
import { FluidObject } from 'gatsby-image'

const page = {
  frontmatter: {
    title: 'Photos',
    description: 'Personal photos of designer & developer Matthias Kretschmann.'
  }
}

interface PhotoNode {
  id: string
  fields: { slug: string }
  frontmatter: {
    title: string
    image: { childImageSharp: { fluid: FluidObject } }
  }
}

const PhotoThumbs = ({ edges }: { edges: [{ node: PhotoNode }] }) =>
  edges.map(({ node }) => {
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

export default function Photos({
  data,
  location
}: {
  data: { photos: { edges: [{ node: PhotoNode }] } }
  location: Location
}) {
  return (
    <Page
      title={page.frontmatter.title}
      post={page}
      location={location}
      section={styles.photos}
    >
      <PhotoThumbs edges={data.photos.edges} />
    </Page>
  )
}

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
