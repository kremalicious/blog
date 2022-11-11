import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'
import Tag from '../../atoms/Tag'
import { useSiteMetadata } from '../../../hooks/use-site-metadata'
import * as styles from './Meta.module.css'
import PostDate from '../../molecules/PostDate'

export default function PostMeta({
  post
}: {
  post: Queries.BlogPostBySlugQuery['post']
}): ReactElement {
  const siteMeta = useSiteMetadata()
  const { author, updated, tags } = post.frontmatter
  const { date, type } = post.fields

  return (
    <footer className={styles.entryMeta}>
      <div className={styles.byline}>
        <span className={styles.by}>by</span>
        <a className="fn" rel="author" href={siteMeta.author.uri}>
          {author || siteMeta.author.name}
        </a>
      </div>

      <PostDate date={date} updated={updated} />

      {type && type === 'photo' && (
        <div className={styles.type}>
          <Link to={`/${slugify(type)}s/`}>{type}s</Link>
        </div>
      )}

      {tags && (
        <div className={styles.tags}>
          {tags.map((tag) => {
            const url = `/archive/${slugify(tag)}/`
            return <Tag key={tag} name={tag} url={url} />
          })}
        </div>
      )}
    </footer>
  )
}
