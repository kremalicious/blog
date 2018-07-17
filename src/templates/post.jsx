import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Image from '../components/Image'

const Post = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, image } = post.frontmatter

  return (
    <div className="blog-post-container">
      <Helmet title={title} />

      <div className="blog-post">
        <h1 className="title">{title}</h1>
        <Image fluid={image.childImageSharp.fluid} alt={title} />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
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
