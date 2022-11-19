import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import { PageContext } from '../../@types/Post'
import Pagination from '../molecules/Pagination'
import PostTeaser from '../molecules/PostTeaser'
import Page from './Page'
import * as styles from './Archive.module.css'
import HeadMeta, { HeadMetaProps } from '../atoms/HeadMeta'

function getMetadata(pageContext: PageContext) {
  const { tag, currentPageNumber, numPages } = pageContext
  const title = tag ? `#${tag}` : 'Archive'
  const paginationTitle =
    numPages > 1 && currentPageNumber > 1
      ? `Page ${currentPageNumber} / ${numPages}`
      : ''

  const meta: Partial<HeadMetaProps> = {
    title: `${title} ${paginationTitle}`,
    description: 'All the articles & links.'
  }

  return meta
}

export default function Archive({
  data,
  pageContext
}: {
  data: Queries.ArchiveTemplateQuery
  pageContext: PageContext
}): ReactElement {
  const edges = data.allMarkdownRemark.edges
  const meta = getMetadata(pageContext)

  const PostsList = edges.map(({ node }) => (
    <PostTeaser key={node.id} post={node} />
  ))

  return (
    <Page title={meta.title}>
      <div className={styles.posts}>{PostsList}</div>
      {pageContext.numPages > 1 && <Pagination pageContext={pageContext} />}
    </Page>
  )
}

export function Head({ pageContext }: { pageContext: PageContext }) {
  const meta = getMetadata(pageContext)
  return <HeadMeta {...meta} slug={pageContext.slug} />
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
