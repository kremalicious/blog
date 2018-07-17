import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Image from '../components/atoms/Image'

const Post = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, image } = post.frontmatter

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <article className="blog-post">
        <h1 className="title">{title}</h1>
        {image && <Image fluid={image.childImageSharp.fluid} alt={title} />}
        <div
          className="blog-post-content"
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
