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
  const { title, image, linkurl, style, tags, updated } = post.frontmatter
  const { slug, githubLink, date, type } = post.fields

  return (
    <>
      <Helmet title={title}>
        {style && <link rel="stylesheet" href={style.publicURL} />}
      </Helmet>

      <SEO slug={slug} post={post} postSEO />

      <article className={styles.hentry}>
        <header>
          <PostTitle
            linkurl={linkurl}
            title={title}
            date={date}
            updated={updated}
          />

          {type === 'article' && <PostLead post={post} />}

          {image && (
            <Image
              fluid={image.childImageSharp.fluid}
              alt={title}
              original={image.childImageSharp.original}
            />
          )}
        </header>

        {type === 'photo' ? (
          <>
            {image && image.fields && <Exif exif={image.fields.exif} />}
            <PostContent post={post} />
          </>
        ) : (
          <PostContent post={post} />
        )}

        {type === 'link' && <PostLinkActions slug={slug} linkurl={linkurl} />}
        <PostMeta post={post} />
        <PostActions slug={slug} githubLink={githubLink} />
      </article>

      <RelatedPosts isPhotos={type === 'photo'} tags={tags} />

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
