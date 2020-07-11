import React, { ReactElement } from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Page from '../components/templates/Page'
import { Post } from '../@types/Post'
import { Image } from '../components/atoms/Image'
import styles from './index.module.scss'
import Featured from '../components/molecules/Featured'

const page = {
  frontmatter: {
    title: 'home',
    description: 'Blog of designer & developer Matthias Kretschmann.'
  }
}

export default function Home(props: PageProps): ReactElement {
  return (
    <Page title={page.frontmatter.title} post={page} section={styles.home}>
      <Featured />
      Latest Posts & Links
      <br />
      Latest Photos
    </Page>
  )
}

export const homeQuery = graphql`
  query {
    latestPosts: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "post" } } }
      sort: { order: DESC, fields: [fields___date] }
      limit: 5
    ) {
      edges {
        node {
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

    latestPhotos: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "photo" } } }
      sort: { order: DESC, fields: [fields___date] }
      limit: 10
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
