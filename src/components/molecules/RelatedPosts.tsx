import React, { ReactElement, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PostTeaser from './PostTeaser'
import * as styles from './RelatedPosts.module.css'
import { PhotoThumb } from '../templates/Photos'

const query = graphql`
  query RelatedPosts {
    allMarkdownRemark(sort: { fields: { date: DESC } }) {
      edges {
        node {
          ...PostTeaser
        }
      }
    }
  }
`

function postsWithDataFilter(
  posts: Queries.RelatedPostsQuery['allMarkdownRemark']['edges'],
  key: keyof Queries.MarkdownRemarkFrontmatter,
  valuesToFind: string[]
) {
  const newArray = posts
    .filter(({ node }) => {
      const frontmatterKey = node.frontmatter[key] as []

      if (
        frontmatterKey !== null &&
        frontmatterKey.some((r: string) => valuesToFind.includes(r))
      ) {
        return node
      }
    })
    .sort(() => 0.5 - Math.random())
    .slice(0, 6)

  return newArray
}

function photosWithDataFilter(
  posts: Queries.RelatedPostsQuery['allMarkdownRemark']['edges']
) {
  const newArray = posts
    .filter((post) => {
      const { fileAbsolutePath } = post.node

      if (fileAbsolutePath.includes('content/photos')) {
        return post
      }
    })
    .sort(() => 0.5 - Math.random())
    .slice(0, 6)

  return newArray
}

export default function RelatedPosts({
  tags,
  isPhotos
}: {
  tags: string[]
  isPhotos?: boolean
}): ReactElement {
  const data = useStaticQuery<Queries.RelatedPostsQuery>(query)
  const posts = data.allMarkdownRemark.edges

  function getPosts() {
    return isPhotos
      ? photosWithDataFilter(posts)
      : tags && postsWithDataFilter(posts, 'tags', tags)
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
