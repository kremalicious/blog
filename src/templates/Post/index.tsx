import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import PostImage from './PostImage'
import PostTitle from './PostTitle'
import PostLead from './PostLead'
import PostContent from './PostContent'
import PostActions from './PostActions'
import PostLinkActions from './PostLinkActions'
import SEO from '../../components/atoms/SEO'
import PostMeta from './PostMeta'
import Exif from '../../components/atoms/Exif'
import RelatedPosts from '../../components/molecules/RelatedPosts'
import styles from './index.module.scss'
import { Post as PostMetadata } from '../../@types/Post'

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
            <div className={styles.imageWrap}>
              <PostImage
                fluid={image.childImageSharp.fluid}
                alt={title}
                original={image.childImageSharp.original}
              />
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
              formatted {
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
