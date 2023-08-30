import type { ReactElement } from 'react'
import slugify from 'slugify'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import Tag from '../../components/core/Tag'
import PostDate from '../../components/PostDate'
import styles from './Meta.module.css'

export default function PostMeta({
  post
}: {
  post: Queries.BlogPostBySlugQuery['post']
}): ReactElement {
  const siteMeta = useSiteMetadata()
  const { author, updated, tags } = post.data
  const { date, type } = post

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
          <a href={`/${slugify(type)}s/`}>{type}s</a>
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
