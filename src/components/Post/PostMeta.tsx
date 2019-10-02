import React from 'react'
import { Link } from 'gatsby'
import Time from 'react-time'
import slugify from 'slugify'
import styles from './PostMeta.module.scss'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

const PostMeta = ({ post }: { post: any }) => {
  const { author, updated, tags, type } = post.frontmatter
  const siteMeta = useSiteMetadata()
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
        <Time value={new Date(date)} titleFormat="YYYY/MM/DD HH:mm" relative />

        {updated && ' • updated '}
        {updated && (
          <Time
            value={new Date(updated)}
            titleFormat="YYYY/MM/DD HH:mm"
            relative
          />
        )}
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

export default PostMeta
