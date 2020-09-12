import React, { ReactElement } from 'react'
import { graphql, PageProps } from 'gatsby'
import { Post } from '../@types/Post'
import styles from './index.module.scss'
import Featured from '../components/molecules/Featured'
import { PhotoThumb } from '../components/templates/Photos'
import PostTeaser from '../components/molecules/PostTeaser'
import PostMore from '../components/templates/Post/More'

export default function Home(props: PageProps): ReactElement {
  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.title}>
          Latest Articles <PostMore to="/archive">All Articles</PostMore>
        </h2>

        <div className={styles.articles}>
          {(props.data as any).latestArticles.edges.map(
            ({ node }: { node: Post }) => (
              <PostTeaser key={node.id} post={node} />
            )
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>
          Latest Photos <PostMore to="/photos">All Photos</PostMore>
        </h2>

        <div className={styles.photos}>
          {(props.data as any).latestPhotos.edges.map(
            ({ node }: { node: Post }) => (
              <PhotoThumb key={node.id} photo={node} />
            )
          )}
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
      limit: 6
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
      limit: 15
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
