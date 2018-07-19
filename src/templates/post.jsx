import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Image from '../components/atoms/Image'
import PostTitle from '../components/atoms/PostTitle'
import PostMeta from '../components/molecules/PostMeta'
import styles from './Post.module.scss'

const Post = ({ data }) => {
  const { markdownRemark: post } = data
  const { contentYaml: meta } = data
  const { title, image, type, linkurl } = post.frontmatter

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <article className={styles.hentry}>
        <PostTitle type={type} linkurl={linkurl} title={title} />

        {image && (
          <figure className={styles.hentry__teaser}>
            <Image fluid={image.childImageSharp.fluid} alt={title} />
          </figure>
        )}

        <div
          className={styles.hentry__content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <PostMeta post={post} meta={meta} />
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
