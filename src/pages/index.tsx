import { graphql, PageProps } from 'gatsby'
import React, { ReactElement } from 'react'
import { Post } from '../@types/Post'
import SEO from '../components/atoms/SEO'
import PostTeaser from '../components/molecules/PostTeaser'
import { PhotoThumb } from '../components/templates/Photos'
import PostMore from '../components/templates/Post/More'
import styles from './index.module.scss'

export default function Home({ data }: PageProps): ReactElement {
  return (
    <>
      <SEO />
      <section className={styles.section}>
        <div className={styles.articles}>
          {(data as any).latestArticles.edges
            .slice(0, 4)
            .map(({ node }: { node: Post }) => (
              <PostTeaser key={node.id} post={node} hideDate />
            ))}
        </div>
        <div className={`${styles.articles} ${styles.articlesLast}`}>
          {(data as any).latestArticles.edges
            .slice(4, 7)
            .map(({ node }: { node: Post }) => (
              <PostTeaser key={node.id} post={node} hideDate />
            ))}
        </div>

        <PostMore to="/archive">All Articles</PostMore>
      </section>

      <section className={styles.section}>
        <div className={styles.photos}>
          {(data as any).latestPhotos.edges.map(({ node }: { node: Post }) => (
            <PhotoThumb key={node.id} photo={node} />
          ))}
        </div>

        <PostMore to="/photos">All Photos</PostMore>
      </section>
    </>
  )
}

export const homeQuery = graphql`
  query {
    latestArticles: allMarkdownRemark(
      filter: { fields: { type: { ne: "photo" } } }
      sort: { order: DESC, fields: [fields___date] }
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
      sort: { order: DESC, fields: [fields___date] }
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
