import React from 'react'
import { graphql, Link } from 'gatsby'
import Page from '../templates/Page'
import PostImage from '../templates/Post/PostImage'
import styles from './photos.module.scss'
import { Post } from '../@types/Post'

const page = {
  frontmatter: {
    title: 'Photos',
    description: 'Personal photos of designer & developer Matthias Kretschmann.'
  }
}

const PhotoThumb = ({ photo }: { photo: Post }) => {
  const { title, image } = photo.frontmatter
  const { slug } = photo.fields
  const { fluid } = image.childImageSharp

  return (
    <article className={styles.photo}>
      {image && (
        <Link to={slug}>
          <PostImage title={title} fluid={fluid} alt={title} />
        </Link>
      )}
    </article>
  )
}

export default function Photos({
  data,
  location
}: {
  data: { photos: { edges: [{ node: Post }] } }
  location: Location
}) {
  return (
    <Page
      title={page.frontmatter.title}
      post={page}
      location={location}
      section={styles.photos}
    >
      {data.photos.edges.map(({ node }) => (
        <PhotoThumb key={node.id} photo={node} />
      ))}
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
