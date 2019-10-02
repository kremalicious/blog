import React from 'react'
import { graphql, Link } from 'gatsby'
import PostImage from '../components/Post/PostImage'
import Page from '../templates/Page'
import styles from './goodies.module.scss'
import { FluidObject } from 'gatsby-image'

const page = {
  frontmatter: {
    title: 'Goodies',
    description:
      'Goodies released by designer & developer Matthias Kretschmann.'
  }
}

interface GoodieNode {
  id: string
  fields: { slug: string }
  frontmatter: {
    title: string
    image: { childImageSharp: { fluid: FluidObject } }
  }
}

const GoodiesThumbs = ({ edges }: { edges: [{ node: GoodieNode }] }) =>
  edges.map(({ node }: { node: GoodieNode }) => {
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

export default function Goodies({
  data,
  location
}: {
  data: { goodies: { edges: [{ node: GoodieNode }] } }
  location: Location
}) {
  return (
    <Page title={page.frontmatter.title} post={page} location={location}>
      <GoodiesThumbs edges={data.goodies.edges} />
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
