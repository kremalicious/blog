import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { Post as PostMetadata } from '../../../@types/Post'
import Exif from '../../atoms/Exif'
import SEO from '../../atoms/SEO'
import RelatedPosts from '../../molecules/RelatedPosts'
import PostTitle from './Title'
import PostLead from './Lead'
import PostContent from './Content'
import PostActions from './Actions'
import PostLinkActions from './LinkActions'
import PostMeta from './Meta'
import PostAd from '../../atoms/Ad'
import PrevNext from './PrevNext'
import styles from './index.module.scss'
import { Image } from '../../atoms/Image'

export default function Post({
  data,
  pageContext: { next, prev }
}: {
  data: { post: PostMetadata }
  pageContext: {
    next: { title: string; slug: string }
    prev: { title: string; slug: string }
  }
}): ReactElement {
  const { post } = data
  const { title, image, type, linkurl, style, tags, updated } = post.frontmatter
  const { slug, githubLink, date } = post.fields

  return (
    <>
      <Helmet title={title}>
        {style && <link rel="stylesheet" href={style.publicURL} />}
      </Helmet>

      <SEO slug={slug} post={post} postSEO />

      <article className={styles.hentry}>
        <header>
          <PostTitle
            type={type}
            linkurl={linkurl}
            title={title}
            date={date}
            updated={updated}
          />
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
        <PostMeta post={post} />
        <PostActions slug={slug} githubLink={githubLink} />
        <PostAd />
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
      tableOfContents(maxDepth: 3)
    }
  }
`
