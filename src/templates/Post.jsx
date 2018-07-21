import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Image from '../components/atoms/Image'
import PostTitle from '../components/atoms/PostTitle'
import PostMeta from '../components/molecules/PostMeta'
import styles from './Post.module.scss'

const separator = '<!-- more -->'

// Extract lead paragraph from content
// Grab everything before more tag, or just first paragraph
const PostLead = ({ post }) => {
  let lead
  const content = post.html

  if (post.frontmatter.type === 'post') {
    if (content.includes(separator)) {
      lead = content.split(separator)[0]
    } else {
      lead = content.split('\n')[0]
    }
  } else {
    return null
  }

  return (
    <div
      className={styles.hentry__lead}
      dangerouslySetInnerHTML={{ __html: lead }}
    />
  )
}

// Remove lead paragraph from content
const PostContent = ({ post }) => {
  let content

  content = post.html

  if (post.frontmatter.type === 'post') {
    if (content.includes(separator)) {
      content = content.split(separator)[1]
    } else {
      const lead = content.split('\n')[0]
      content = content.replace(lead, '')
    }
  }

  return (
    <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
  )
}

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
    }

    contentYaml {
      author {
        uri
      }
    }
  }
`
