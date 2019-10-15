import React from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'
import Time from '../atoms/Time'
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import styles from './PostMeta.module.scss'
import { PostMetadata } from '../../@types/PostMetadata'

export default function PostMeta({ post }: { post: PostMetadata }) {
  const siteMeta = useSiteMetadata()
  const { author, updated, tags, type } = post.frontmatter
  const { date } = post.fields

  return (
    <footer className={styles.entryMeta}>
      <div className={styles.byline}>
        <span className={styles.by}>by</span>
        <a className="fn" rel="author" href={siteMeta.author.uri}>
          {author || siteMeta.author.name}
        </a>
      </div>

      <div className={styles.time}>
        {updated && 'published '}
        <Time date={date} />
        {updated && ' • updated '}
        {updated && <Time date={updated} />}
      </div>

      {type && type === 'photo' && (
        <div className={styles.type}>
          <Link to={`/${slugify(type)}s/`}>{type}s</Link>
        </div>
      )}

      {tags && (
        <div className={styles.tags}>
          {tags.map((tag: string) => {
            const to = tag === 'goodies' ? '/goodies' : `/tags/${slugify(tag)}/`

            return (
              <Link key={tag} className={styles.tag} to={to}>
                {tag}
              </Link>
            )
          })}
        </div>
      )}
    </footer>
  )
}
