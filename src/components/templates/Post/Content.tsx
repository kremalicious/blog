import React, { ReactElement } from 'react'
import Changelog from '../../atoms/Changelog'
import { Post } from '../../../@types/Post'
import PostToc from './Toc'
import { content as styleContent } from './Content.module.css'

export default function PostContent({ post }: { post: Post }): ReactElement {
  const separator = '<!-- more -->'
  const changelog = post.frontmatter.changelog

  let content = post.html

  if (post.fields.type === 'article') {
    // Remove lead paragraph from content
    if (content.includes(separator)) {
      content = content.split(separator)[1]
    } else {
      const lead = content.split('\n')[0]
      content = content.replace(lead, '')
    }
  }

  return (
    <>
      {post.frontmatter.toc && (
        <PostToc tableOfContents={post.tableOfContents} />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className={styleContent}
      />
      {changelog && <Changelog repo={changelog} />}
    </>
  )
}
