import React, { ReactElement, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PostTeaser from './PostTeaser'
import styles from './RelatedPosts.module.scss'
import { Post, Frontmatter } from '../../@types/Post'

const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
      edges {
        node {
          ...PostTeaser
        }
      }
    }
  }
`

function postsWithDataFilter(
  posts: [{ node: Post }],
  key: keyof Frontmatter,
  valuesToFind: string[]
) {
  const newArray = posts.filter(({ node }: { node: Post }) => {
    const frontmatterKey = node.frontmatter[key] as []

    if (
      frontmatterKey !== null &&
      frontmatterKey.some((r: string) => valuesToFind.includes(r))
    ) {
      return node
    }
  })
  return newArray
}

function photosWithDataFilter(posts: []) {
  const newArray = posts.filter((post: { node: Post }) => {
    const { fileAbsolutePath } = post.node

    if (fileAbsolutePath.includes('content/photos')) {
      return post
    }
  })
  return newArray
}

export default function RelatedPosts({
  tags,
  photos
}: {
  tags: string[]
  photos?: boolean
}): ReactElement {
  const data = useStaticQuery(query)
  const posts = data.allMarkdownRemark.edges

  function getPosts() {
    return photos
      ? photosWithDataFilter(posts)
      : tags && postsWithDataFilter(posts, 'tags', tags)
  }

  const [filteredPosts, setFilteredPosts] = useState(getPosts())
  if (!filteredPosts) return null

  function refreshPosts() {
    setFilteredPosts(getPosts())
  }

  return (
    <aside className={styles.relatedPosts}>
      <h1 className={styles.title}>
        Related {photos ? 'Photos' : 'Posts'}{' '}
        <button className={styles.button} onClick={refreshPosts}>
          Refresh
        </button>
      </h1>
      <ul>
        {filteredPosts
          .sort(() => 0.5 - Math.random())
          .slice(0, 6)
          .map(({ node }: { node: Post }) => (
            <li key={node.id}>
              <PostTeaser post={node} />
            </li>
          ))}
      </ul>
    </aside>
  )
}
