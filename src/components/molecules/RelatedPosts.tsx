import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PostTeaser from '../../templates/Post/PostTeaser'
import styles from './RelatedPosts.module.scss'
import { Post, Frontmatter } from '../../@types/Post'

const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
      edges {
        node {
          id
          fileAbsolutePath
          frontmatter {
            title
            type
            linkurl
            tags
            image {
              childImageSharp {
                ...ImageFluidThumb
              }
            }
          }
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
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
}) {
  const data = useStaticQuery(query)
  const posts = data.allMarkdownRemark.edges

  function getPosts() {
    return photos
      ? photosWithDataFilter(posts)
      : postsWithDataFilter(posts, 'tags', tags)
  }

  const [filteredPosts, setFilteredPosts] = useState(getPosts())

  function refreshPosts() {
    setFilteredPosts(getPosts())
  }

  return (
    <aside className={styles.relatedPosts}>
      <h1 className={styles.title}>Related {photos ? 'Photos' : 'Posts'}</h1>
      <ul>
        {filteredPosts
          .sort(() => 0.5 - Math.random())
          .slice(0, 6)
          .map(({ node }: { node: Post }) => (
            <PostTeaser key={node.id} post={node} />
          ))}
      </ul>
      <button className={`${styles.button} btn`} onClick={refreshPosts}>
        Refresh Related {photos ? 'Photos' : 'Posts'}
      </button>
    </aside>
  )
}
