import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Image from '../components/atoms/Image'
import styles from './Post.module.scss'

const Post = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, image } = post.frontmatter

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <article className={styles.hentry}>
        <h1 className={styles.hentry__title}>{title}</h1>
        {image && (
          <figure className={styles.hentry__teaser}>
            <Image fluid={image.childImageSharp.fluid} alt={title} />
          </figure>
        )}
        <div
          className={styles.hentry__content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Layout>
  )
}

Post.propTypes = {
  data: PropTypes.object.isRequired
}

export default Post

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            ...ImageFluid
          }
        }
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
