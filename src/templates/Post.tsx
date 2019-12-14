import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { Post as PostMetadata } from '../@types/Post'
import Exif from '../components/atoms/Exif'
import SEO from '../components/atoms/SEO'
import RelatedPosts from '../components/molecules/RelatedPosts'
import PostTitle from '../components/organisms/Post/Title'
import PostLead from '../components/organisms/Post/Lead'
import PostContent from '../components/organisms/Post/Content'
import PostActions from '../components/organisms/Post/Actions'
import PostLinkActions from '../components/organisms/Post/LinkActions'
import PostMeta from '../components/organisms/Post/Meta'
import PrevNext from '../components/organisms/Post/PrevNext'
import styles from './Post.module.scss'
import { Image } from '../components/atoms/Image'

export default function Post({
  data,
  pageContext: { next, prev }
}: {
  data: { post: PostMetadata }
  pageContext: {
    next: { title: string; slug: string }
    prev: { title: string; slug: string }
  }
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

      <article className={styles.hentry}>
        <header>
          <PostTitle type={type} linkurl={linkurl} title={title} />
          {type === 'post' && <PostLead post={post} />}
        </header>

        {type === 'photo' && <PostContent post={post} />}
        {image && (
          <Image
            fluid={image.childImageSharp.fluid}
            alt={title}
            original={image.childImageSharp.original}
          />
        )}
        {type === 'photo' && image && image.fields && (
          <Exif exif={image.fields.exif} />
        )}

        {type !== 'photo' && <PostContent post={post} />}

        {type === 'link' && <PostLinkActions slug={slug} linkurl={linkurl} />}
        <PostActions slug={slug} githubLink={githubLink} />
        <PostMeta post={post} />
      </article>

      <RelatedPosts photos={type === 'photo'} tags={tags} />

      <PrevNext prev={prev} next={next} />
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
        toc
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
      tableOfContents(maxDepth: 2)
    }
  }
`
