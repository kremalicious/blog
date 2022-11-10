import { graphql, PageProps } from 'gatsby'
import React, { ReactElement } from 'react'
import SEO from '../components/atoms/SEO'
import PostTeaser from '../components/molecules/PostTeaser'
import { PhotoThumb } from '../components/templates/Photos'
import PostMore from '../components/templates/Post/More'
import * as styles from './index.module.css'

export default function Home(
  props: PageProps<Queries.HomePageQuery>
): ReactElement {
  return (
    <>
      <SEO />
      <section className={styles.section}>
        <div className={styles.articles}>
          {props.data.latestArticles.edges.slice(0, 2).map(({ node }) => (
            <PostTeaser key={node.id} post={node} hideDate />
          ))}
        </div>
        <div className={`${styles.articles} ${styles.articlesLast}`}>
          {props.data.latestArticles.edges.slice(2, 8).map(({ node }) => (
            <PostTeaser key={node.id} post={node} hideDate />
          ))}
        </div>

        <PostMore to="/archive">All Articles</PostMore>
      </section>

      <section className={styles.section}>
        <div className={styles.photos}>
          {props.data.latestPhotos.edges.map(({ node }) => (
            <PhotoThumb key={node.id} photo={node} />
          ))}
        </div>

        <PostMore to="/photos">All Photos</PostMore>
      </section>
    </>
  )
}

export const homeQuery = graphql`
  query HomePage {
    latestArticles: allMarkdownRemark(
      filter: { fields: { type: { ne: "photo" } } }
      sort: { fields: { date: DESC } }
      limit: 8
    ) {
      edges {
        node {
          ...PostTeaser
        }
      }
    }
    latestPhotos: allMarkdownRemark(
      filter: { fields: { type: { eq: "photo" } } }
      sort: { fields: { date: DESC } }
      limit: 12
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                ...PhotoFluidThumb
              }
            }
          }
          fields {
            slug
            type
          }
        }
      }
    }
  }
`
