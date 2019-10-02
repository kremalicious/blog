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

const postsWithDataFilter = (
  postsArray: [],
  key: string,
  valuesToFind: string[]
) => {
  const newArray = postsArray.filter((post: any) => {
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

export default function RelatedPosts({ tags }: { tags: string[] }) {
  const data = useStaticQuery(query)
  const posts = data.allMarkdownRemark.edges
  const [filteredPosts, setFilteredPosts] = useState(
    postsWithDataFilter(posts, 'tags', tags)
  )

  function refreshPosts() {
    setFilteredPosts(postsWithDataFilter(posts, 'tags', tags))
  }

  return (
    <aside className={styles.relatedPosts}>
      <h1 className={styles.title}>Related Posts</h1>
      <ul>
        {filteredPosts
          .sort(() => 0.5 - Math.random())
          .slice(0, 6)
          .map(({ node }: { node: any }) => (
            <PostTeaser key={node.id} post={node} />
          ))}
      </ul>
      <button className={`${styles.button} btn`} onClick={refreshPosts}>
        Refresh Related Posts
      </button>
    </aside>
  )
}
