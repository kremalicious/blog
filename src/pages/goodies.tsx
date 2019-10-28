import React from 'react'
import { graphql, Link } from 'gatsby'
import PostImage from '../templates/Post/PostImage'
import Page from '../templates/Page'
import styles from './goodies.module.scss'
import { Post } from '../@types/Post'

const page = {
  frontmatter: {
    title: 'Goodies',
    description:
      'Goodies released by designer & developer Matthias Kretschmann.'
  }
}

const GoodiesThumb = ({ post }: { post: Post }) => {
  const { title, image } = post.frontmatter
  const { slug } = post.fields

  return (
    <article className={styles.goodie}>
      {image && (
        <Link to={slug}>
          <h1 className={styles.title}>{title}</h1>
          <PostImage fluid={image.childImageSharp.fluid} alt={title} />
        </Link>
      )}
    </article>
  )
}

export default function Goodies({
  data,
  location
}: {
  data: { goodies: { edges: [{ node: Post }] } }
  location: Location
}) {
  return (
    <Page title={page.frontmatter.title} post={page} location={location}>
      {data.goodies.edges.map(({ node }) => (
        <GoodiesThumb key={node.id} post={node} />
      ))}
    </Page>
  )
}

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
