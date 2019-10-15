import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostImage from '../components/Post/PostImage'
import PostTitle from '../components/Post/PostTitle'
import PostLead from '../components/Post/PostLead'
import PostContent from '../components/Post/PostContent'
import PostActions from '../components/Post/PostActions'
import PostLinkActions from '../components/Post/PostLinkActions'
import SEO from '../components/atoms/SEO'
import PostMeta from '../components/Post/PostMeta'
import Exif from '../components/atoms/Exif'
import RelatedPosts from '../components/molecules/RelatedPosts'
import styles from './Post.module.scss'
import { PostMetadata } from '../@types/PostMetadata'

export default function Post({
  data,
  location
}: {
  data: { post: PostMetadata }
  location: Location
}) {
  const { post } = data
  const { title, image, type, linkurl, style, tags } = post.frontmatter
  const { slug, githubLink } = post.fields

  return (
    <>
      <Helmet title={title}>
        {style && <link rel="stylesheet" href={style.publicURL} />}
      </Helmet>

      <SEO slug={slug} post={post} postSEO />

      <Layout location={location}>
        <article className={styles.hentry}>
          <PostTitle type={type} linkurl={linkurl} title={title} />
          {type === 'post' && <PostLead post={post} />}
          {type === 'photo' && <PostContent post={post} />}
          {image && (
            <div className={styles.postImageWrap}>
              <PostImage fluid={image.childImageSharp.fluid} alt={title} />
            </div>
          )}
          {image && image.fields && <Exif exif={image.fields.exif} />}

          {type !== 'photo' && <PostContent post={post} />}

          {type === 'link' && <PostLinkActions slug={slug} linkurl={linkurl} />}
          <PostActions slug={slug} githubLink={githubLink} />
          <PostMeta post={post} />
        </article>

        {(type === 'post' || type === 'photo') && (
          <RelatedPosts photos={type === 'photo'} tags={tags} />
        )}
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
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
              lensModel
              exposure
              gps {
                latitude
                longitude
              }
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
        changelog
      }
      fields {
        slug
        date
        githubLink
      }
      rawMarkdownBody
    }
  }
`
