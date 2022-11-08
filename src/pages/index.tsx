import { graphql, PageProps } from 'gatsby'
import React, { ReactElement } from 'react'
import { Post } from '../@types/Post'
import SEO from '../components/atoms/SEO'
import PostTeaser from '../components/molecules/PostTeaser'
import { PhotoThumb } from '../components/templates/Photos'
import PostMore from '../components/templates/Post/More'
import { section, articles, articlesLast, photos } from './index.module.css'

export default function Home({ data }: PageProps): ReactElement {
  return (
    <>
      <SEO />
      <section className={section}>
        <div className={articles}>
          {(data as any).latestArticles.edges
            .slice(0, 2)
            .map(({ node }: { node: Post }) => (
              <PostTeaser key={node.id} post={node} hideDate />
            ))}
        </div>
        <div className={`${articles} ${articlesLast}`}>
          {(data as any).latestArticles.edges
            .slice(2, 8)
            .map(({ node }: { node: Post }) => (
              <PostTeaser key={node.id} post={node} hideDate />
            ))}
        </div>

        <PostMore to="/archive">All Articles</PostMore>
      </section>

      <section className={section}>
        <div className={photos}>
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
  {
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
