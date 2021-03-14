import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'
import Tag from '../../atoms/Tag'
import { useSiteMetadata } from '../../../hooks/use-site-metadata'
import {
  entryMeta,
  byline,
  by,
  type as styleType,
  tags as styleTags
} from './Meta.module.css'
import { Post } from '../../../@types/Post'
import shortid from 'shortid'
import PostDate from '../../molecules/PostDate'

export default function PostMeta({ post }: { post: Post }): ReactElement {
  const siteMeta = useSiteMetadata()
  const { author, updated, tags } = post.frontmatter
  const { date, type } = post.fields

  return (
    <footer className={entryMeta}>
      <div className={byline}>
        <span className={by}>by</span>
        <a className="fn" rel="author" href={siteMeta.author.uri}>
          {author || siteMeta.author.name}
        </a>
      </div>

      <PostDate date={date} updated={updated} />

      {type && type === 'photo' && (
        <div className={styleType}>
          <Link to={`/${slugify(type)}s/`}>{type}s</Link>
        </div>
      )}

      {tags && (
        <div className={styleTags}>
          {tags.map((tag: string) => {
            const url = `/archive/${slugify(tag)}/`
            return <Tag key={shortid.generate()} name={tag} url={url} />
          })}
        </div>
      )}
    </footer>
  )
}
