import React, { ReactElement } from 'react'
import { graphql } from 'gatsby'
import Page from '../components/templates/Page'
import Tag from '../components/atoms/Tag'
import styles from './tags.module.scss'

const page = {
  frontmatter: {
    title: 'Tags',
    description: 'All the tags being used.'
  }
}

interface Tag {
  fieldValue: string
  totalCount: number
}

interface TagsPageProps {
  data: {
    allMarkdownRemark: { group: Tag[] }
  }
  location: Location
}

const TagsPage = ({ data, location }: TagsPageProps): ReactElement => (
  <Page title={page.frontmatter.title} location={location} post={page}>
    <ul className={styles.tags}>
      {data.allMarkdownRemark.group
        .sort((a, b) => b.totalCount - a.totalCount)
        .map((tag: Tag) => (
          <li key={tag.fieldValue}>
            <Tag
              name={tag.fieldValue}
              url={`/tags/${tag.fieldValue}/`}
              count={tag.totalCount}
              style={{ fontSize: `${100 + tag.totalCount * 2}%` }}
            />
          </li>
        ))}
    </ul>
  </Page>
)

export default TagsPage

export const tagsPageQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
