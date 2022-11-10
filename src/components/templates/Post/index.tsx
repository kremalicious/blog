import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
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
import * as styles from './index.module.css'
import { Image } from '../../atoms/Image'

export default function Post({
  data,
  pageContext: { next, prev }
}: {
  data: Queries.BlogPostBySlugQuery
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

      <SEO slug={slug} post={post} />

      <article className={styles.hentry}>
        <header>
          <PostTitle
            linkurl={linkurl}
            title={title}
            date={date}
            updated={updated}
          />
        </header>

        {type === 'article' && <PostLead post={post} />}
        {type === 'photo' && <PostContent post={post} />}

        {image && (
          <Image
            className={styles.image}
            image={(image as any).childImageSharp.gatsbyImageData}
            alt={title}
          />
        )}

        {type === 'photo' ? (
          image?.fields && (
            <Exif exif={image.fields.exif as Queries.ImageExif} />
          )
        ) : (
          <PostContent post={post} />
        )}

        {type === 'link' && <PostLinkActions slug={slug} linkurl={linkurl} />}
        <PostMeta post={post} />
        <PostActions slug={slug} githubLink={githubLink} />
      </article>

      <RelatedPosts isPhotos={type === 'photo'} tags={tags as string[]} />

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
        type
        slug
        date
        githubLink
      }
      rawMarkdownBody
      tableOfContents(maxDepth: 3)
    }
  }
`
