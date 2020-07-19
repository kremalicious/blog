import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './Featured.module.scss'
import { Post } from '../../@types/Post'
import PostTeaser from './PostTeaser'

const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          ...PostTeaser
        }
      }
    }
  }
`

export default function Featured(): ReactElement {
  const data = useStaticQuery(query)

  return (
    <div className={styles.featured}>
      {data.allMarkdownRemark.edges.map(({ node }: { node: Post }) => (
        <PostTeaser key={node.id} post={node} />
      ))}
    </div>
  )
}
