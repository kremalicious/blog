import React, { ReactElement } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Image } from '../atoms/Image'
import styles from './Featured.module.scss'
import { Post } from '../../@types/Post'

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
      {data.allMarkdownRemark.edges.map(({ node }: { node: Post }) => {
        const { title, image } = node.frontmatter
        const { slug } = node.fields

        return (
          <article className={styles.featuredItem} key={node.id}>
            <Link to={slug}>
              <Image fluid={image.childImageSharp.fluid} alt={title} />
              <h1 className={styles.featuredTitle}>{title}</h1>
            </Link>
          </article>
        )
      })}
    </div>
  )
}
