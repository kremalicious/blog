import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import { Post, PageContext } from '../../@types/Post'
import Pagination from '../molecules/Pagination'
import styles from './Archive.module.css'
import PostTeaser from '../molecules/PostTeaser'
import Page from './Page'

export default function Archive({
  data,
  pageContext
}: {
  data: any
  pageContext: PageContext
}): ReactElement {
  const edges = data.allMarkdownRemark.edges
  const { tag, currentPageNumber, numPages } = pageContext

  const PostsList = edges.map(({ node }: { node: Post }) => (
    <PostTeaser key={node.id} post={node} />
  ))

  const title = tag ? `#${tag}` : 'Archive'

  const paginationTitle =
    numPages > 1 && currentPageNumber > 1
      ? `Page ${currentPageNumber} / ${numPages}`
      : ''

  const page = {
    frontmatter: {
      title: `${title} ${paginationTitle}`,
      description: 'All the articles & links.'
    }
  }

  return (
    <Page title={page.frontmatter.title} post={page}>
      <div className={styles.posts}>{PostsList}</div>
      {numPages > 1 && <Pagination pageContext={pageContext} />}
    </Page>
  )
}

export const archiveQuery = graphql`
  query($tag: String, $skip: Int, $limit: Int) {
    allMarkdownRemark(
      filter: {
        frontmatter: { tags: { eq: $tag } }
        fields: { type: { ne: "photo" } }
      }
      sort: { order: DESC, fields: [fields___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          ...PostTeaser
        }
      }
    }
  }
`
