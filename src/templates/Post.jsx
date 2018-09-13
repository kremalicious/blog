import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Image from '../components/atoms/Image'
import PostTitle from '../components/atoms/PostTitle'
import PostLead from '../components/atoms/PostLead'
import PostContent from '../components/atoms/PostContent'
import PostActions from '../components/atoms/PostActions'
import PostMeta from '../components/molecules/PostMeta'
import Exif from '../components/atoms/Exif'
import styles from './Post.module.scss'

const Post = ({ data, location }) => {
  const { markdownRemark: post } = data
  const { contentYaml: meta } = data
  const { title, image, type, linkurl, style } = post.frontmatter

  return (
    <Layout location={location}>
      <Helmet title={title}>
        {style && <link rel="stylesheet" href={style.publicURL} />}
      </Helmet>

      <article className={styles.hentry}>
        <PostTitle type={type} linkurl={linkurl} title={title} />

        <PostLead post={post} />

        {image && (
          <figure className={styles.hentryImage}>
            <Image fluid={image.childImageSharp.fluid} alt={title} />
          </figure>
        )}

        {image && image.fields && <Exif exif={image.fields.exif} />}

        <PostContent post={post} />

        <PostActions slug={post.fields.slug} url={meta.url} />

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
  query BlogPostBySlug($slug: String!) {
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
          fields {
            exif {
              iso
              model
              fstop
              shutterspeed
              focalLength
              exposure
            }
          }
        }
        author
        updated
        tags
        linkurl
        style {
          publicURL
        }
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
      rawMarkdownBody
    }

    contentYaml {
      url
      author {
        uri
      }
    }
  }
`
