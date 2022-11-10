import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import { PageContext } from '../../@types/Post'
import Pagination from '../molecules/Pagination'
import PostTeaser from '../molecules/PostTeaser'
import Page from './Page'
import * as styles from './Archive.module.css'

export default function Archive({
  data,
  pageContext
}: {
  data: Queries.ArchiveTemplateQuery
  pageContext: PageContext
}): ReactElement {
  const edges = data.allMarkdownRemark.edges
  const { tag, currentPageNumber, numPages } = pageContext

  const PostsList = edges.map(({ node }) => (
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
    <Page
      title={page.frontmatter.title}
      post={page}
      pathname={pageContext.slug}
    >
      <div className={styles.posts}>{PostsList}</div>
      {numPages > 1 && <Pagination pageContext={pageContext} />}
    </Page>
  )
}

export const archiveQuery = graphql`
  query ArchiveTemplate($tag: String, $skip: Int, $limit: Int) {
    allMarkdownRemark(
      filter: {
        fields: { type: { nin: "photo" } }
        frontmatter: { tags: { eq: $tag } }
      }
      sort: { fields: { date: DESC } }
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
