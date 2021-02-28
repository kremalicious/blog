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
        <h2 className={styles.title}>
          Latest Articles <PostMore to="/archive">All Articles</PostMore>
        </h2>

        <div className={styles.articles}>
          {(data as any).latestArticles.edges
            .slice(0, 2)
            .map(({ node }: { node: Post }) => (
              <PostTeaser key={node.id} post={node} hideDate />
            ))}
        </div>
        <div className={`${styles.articles} ${styles.articlesLast}`}>
          {(data as any).latestArticles.edges
            .slice(2, 8)
            .map(({ node }: { node: Post }) => (
              <PostTeaser key={node.id} post={node} hideDate />
            ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>
          Latest Photos <PostMore to="/photos">All Photos</PostMore>
        </h2>

        <div className={styles.photos}>
          {(data as any).latestPhotos.edges.map(({ node }: { node: Post }) => (
            <PhotoThumb key={node.id} photo={node} />
          ))}
        </div>
      </section>
    </>
  )
}

export const homeQuery = graphql`
  query {
    latestArticles: allMarkdownRemark(
      filter: { frontmatter: { type: { ne: "photo" } } }
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
      filter: { frontmatter: { type: { eq: "photo" } } }
      sort: { order: DESC, fields: [fields___date] }
      limit: 12
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            type
            image {
              childImageSharp {
                ...PhotoFluidThumb
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
