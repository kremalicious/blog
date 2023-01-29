import React, { ReactElement, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { PhotoThumb } from '../templates/Photos'
import PostTeaser from './PostTeaser'
import * as styles from './RelatedPosts.module.css'

const query = graphql`
  query RelatedPosts {
    allArticles: allMarkdownRemark(
      sort: { fields: { date: DESC } }
      filter: { fields: { type: { regex: "/(article|link)/" } } }
    ) {
      edges {
        node {
          ...PostTeaser
        }
      }
    }

    allPhotos: allMarkdownRemark(
      sort: { fields: { date: DESC } }
      filter: { fields: { type: { eq: "photo" } } }
    ) {
      edges {
        node {
          ...PostTeaser
        }
      }
    }
  }
`

function postsWithDataFilter(
  posts:
    | Queries.RelatedPostsQuery['allArticles']['edges']
    | Queries.RelatedPostsQuery['allPhotos']['edges'],
  key: keyof Queries.MarkdownRemarkFrontmatter,
  valuesToFind: string[]
) {
  let filtered = posts.filter(({ node }) => {
    const frontmatterKey = node.frontmatter[key]

    if (
      frontmatterKey !== null &&
      frontmatterKey.some((r: string) => valuesToFind?.includes(r))
    ) {
      return node
    }
  })

  if (!filtered?.length) {
    filtered = posts.filter(({ node }) => node)
  }

  filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, 6)

  return filtered
}

export default function RelatedPosts({
  tags,
  isPhotos
}: {
  tags: string[]
  isPhotos?: boolean
}): ReactElement {
  const data = useStaticQuery<Queries.RelatedPostsQuery>(query)

  function getPosts() {
    const dataByType = isPhotos ? data.allPhotos.edges : data.allArticles.edges
    const posts = postsWithDataFilter(dataByType, 'tags', tags)

    return posts
  }

  const [filteredPosts, setFilteredPosts] = useState(getPosts())

  function refreshPosts() {
    const newPosts = getPosts()
    setFilteredPosts(newPosts)
  }

  return (
    <section className={styles.relatedPosts}>
      <h1 className={styles.title}>
        Related {isPhotos ? 'Photos' : 'Posts'}{' '}
        <button className={styles.button} onClick={() => refreshPosts()}>
          Refresh
        </button>
      </h1>
      <ul>
        {filteredPosts?.map(({ node }) => (
          <li key={node.id}>
            {isPhotos ? (
              <PhotoThumb photo={node} />
            ) : (
              <PostTeaser post={node} hideDate />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
