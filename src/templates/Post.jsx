import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Image from '../components/atoms/Image'
import PostTitle from '../components/atoms/PostTitle'
import PostLead from '../components/atoms/PostLead'
import PostContent from '../components/atoms/PostContent'
import PostMeta from '../components/molecules/PostMeta'
import styles from './Post.module.scss'

const Post = ({ data, location }) => {
  const { markdownRemark: post } = data
  const { contentYaml: meta } = data
  const { title, image, type, linkurl } = post.frontmatter

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <article className={styles.hentry}>
        <PostTitle type={type} linkurl={linkurl} title={title} />

        <PostLead post={post} />

        {image && (
          <figure className={styles.hentry__teaser}>
            <Image fluid={image.childImageSharp.fluid} alt={title} />
          </figure>
        )}

        <PostContent post={post} />

        <PostMeta post={post} meta={meta} />
      </article>
    </Layout>
  )
}

PostLead.propTypes = {
  post: PropTypes.object.isRequired
}

PostContent.propTypes = {
  post: PropTypes.object.isRequired
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Post

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        type
        title
        image {
          childImageSharp {
            ...ImageFluid
          }
        }
        author
        updated
        category
        tags
        linkurl
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
      rawMarkdownBody
    }

    contentYaml {
      author {
        uri
      }
    }
  }
`
