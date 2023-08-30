import React, { ReactElement } from 'react'
import { PageContext } from '../../../@types/Post'
import { useSiteMetadata } from '../../../hooks/useSiteMetadata'
import Exif from '../../core/Exif'
import HeadMeta from '../../core/HeadMeta'
import SchemaOrg from '../../core/HeadMeta/SchemaOrg'
import { Image } from '../../core/Image'
import RelatedPosts from '../../RelatedPosts'
import PostActions from './Actions'
import PostContent from './Content'
import PostLead from './Lead'
import PostLinkActions from './LinkActions'
import PostMeta from './Meta'
import PrevNext from './PrevNext'
import PostTitle from './Title'
import styles from './index.module.css'

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
  const { title, image, linkurl, tags, updated } = post.frontmatter
  const { slug, githubLink, date, type } = post.fields

  return (
    <>
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
        {type !== 'photo' && <PostActions githubLink={githubLink} />}
      </article>

      <RelatedPosts isPhotos={type === 'photo'} tags={tags as string[]} />
      <PrevNext prev={prev} next={next} />
    </>
  )
}

export function Head({
  pageContext,
  data
}: {
  pageContext: PageContext
  data: Queries.BlogPostBySlugQuery
}): ReactElement {
  const { siteUrl } = useSiteMetadata()
  const { excerpt, rawMarkdownBody } = data.post
  const { title, image, style, updated } = data.post.frontmatter
  const { date } = data.post.fields
  const description = excerpt || rawMarkdownBody

  return (
    <HeadMeta
      title={title}
      description={description}
      slug={pageContext.slug}
      image={image}
    >
      <>
        <SchemaOrg
          post={{
            title,
            description,
            image,
            url: `${siteUrl}${pageContext.slug}`,
            datePublished: date,
            dateModified: updated
          }}
        />
        {style && <link rel="stylesheet" href={style.publicURL} />}
      </>
    </HeadMeta>
  )
}
