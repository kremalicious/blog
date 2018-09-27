import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Time from 'react-time'
import slugify from 'slugify'
import PostLinkActions from '../atoms/PostLinkActions'
import styles from './PostMeta.module.scss'

const PostMeta = ({ post, meta }) => {
  const { author, updated, tags, type, linkurl } = post.frontmatter
  const { date, slug } = post.fields

  return (
    <footer className={styles.entryMeta}>
      {type === 'link' && <PostLinkActions slug={slug} linkurl={linkurl} />}

      <div className={styles.byline}>
        <span className={styles.by}>by</span>
        <a className="fn" rel="author" href={meta.author.uri}>
          {author || meta.author.name}
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

      {type &&
        type === 'photo' && (
          <div className={styles.type}>
            <Link to={`/${slugify(type)}s/`}>{type}s</Link>
          </div>
        )}

      {tags && (
        <div className={styles.tags}>
          {tags.map(tag => {
            const to = tag === 'goodies' ? '/goodies' : `/tag/${slugify(tag)}/`

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

PostMeta.propTypes = {
  post: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default PostMeta
