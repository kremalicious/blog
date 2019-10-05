import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PostTeaser from '../Post/PostTeaser'
import styles from './RelatedPosts.module.scss'

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

function postsWithDataFilter(posts: [], key: string, valuesToFind: string[]) {
  const newArray = posts.filter((post: any) => {
    const frontmatterKey = post.node.frontmatter[key]

    if (
      frontmatterKey !== null &&
      frontmatterKey.some((r: string) => valuesToFind.includes(r))
    ) {
      return post
    }
  })
  return newArray
}

function photosWithDataFilter(posts: []) {
  const newArray = posts.filter((post: any) => {
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
          .map(({ node }: { node: any }) => (
            <PostTeaser key={node.id} post={node} />
          ))}
      </ul>
      <button className={`${styles.button} btn`} onClick={refreshPosts}>
        Refresh Related {photos ? 'Photos' : 'Posts'}
      </button>
    </aside>
  )
}
