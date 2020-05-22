import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'
import Time from '../../atoms/Time'
import Tag from '../../atoms/Tag'
import { useSiteMetadata } from '../../../hooks/use-site-metadata'
import styles from './Meta.module.scss'
import { Post } from '../../../@types/Post'
import shortid from 'shortid'

export default function PostMeta({ post }: { post: Post }): ReactElement {
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
            const url = `/tags/${slugify(tag)}/`
            return <Tag key={shortid.generate()} name={tag} url={url} />
          })}
        </div>
      )}
    </footer>
  )
}
