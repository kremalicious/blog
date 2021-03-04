import React, { ReactElement } from 'react'
import { graphql, PageProps } from 'gatsby'
import Page from '../components/templates/Page'
import Tag from '../components/atoms/Tag'
import styles from './tags.module.css'

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

interface TagsPageProps extends PageProps {
  data: {
    allMarkdownRemark: { group: Tag[] }
  }
}

const TagsPage = (props: TagsPageProps): ReactElement => (
  <Page
    title={page.frontmatter.title}
    post={page}
    pathname={props.location.pathname}
  >
    <ul className={styles.tags}>
      {props.data.allMarkdownRemark.group
        .sort((a, b) => b.totalCount - a.totalCount)
        .map((tag: Tag) => (
          <li key={tag.fieldValue}>
            <Tag
              name={tag.fieldValue}
              url={`/archive/${tag.fieldValue}/`}
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
