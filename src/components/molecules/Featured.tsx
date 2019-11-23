import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Image } from '../atoms/Image'
import styles from './Featured.module.scss'
import { Post } from '../../@types/Post'

function FeaturedPure({
  data
}: {
  data: { allMarkdownRemark: { edges: [{ node: Post }] } }
}) {
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

const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                ...ImageFluidThumb
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default function Featured() {
  const data = useStaticQuery(query)
  return <FeaturedPure data={data} />
}
