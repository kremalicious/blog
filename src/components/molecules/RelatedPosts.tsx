import React, { ReactElement, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PostTeaser from './PostTeaser'
import { relatedPosts, title, button } from './RelatedPosts.module.css'
import { Post, Frontmatter } from '../../@types/Post'
import { PhotoThumb } from '../templates/Photos'

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
): { node: Post }[] {
  const newArray = posts
    .filter(({ node }: { node: Post }) => {
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

function photosWithDataFilter(posts: [{ node: Post }]): { node: Post }[] {
  const newArray = posts
    .filter((post: { node: Post }) => {
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
  const data = useStaticQuery(query)
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
    <aside className={relatedPosts}>
      <h1 className={title}>
        Related {isPhotos ? 'Photos' : 'Posts'}{' '}
        <button className={button} onClick={() => refreshPosts()}>
          Refresh
        </button>
      </h1>
      <ul>
        {filteredPosts?.map(({ node }: { node: Post }) => (
          <li key={node.id}>
            {isPhotos ? (
              <PhotoThumb photo={node} />
            ) : (
              <PostTeaser post={node} hideDate />
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}
