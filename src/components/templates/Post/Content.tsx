import React, { ReactElement } from 'react'
import Changelog from '../../atoms/Changelog'
import { Post } from '../../../@types/Post'
import PostToc from './Toc'

// Remove lead paragraph from content
const PostContent = ({ post }: { post: Post }): ReactElement => {
  const separator = '<!-- more -->'
  const changelog = post.frontmatter.changelog

  let content = post.html

  if (post.frontmatter.type === 'post') {
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
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {changelog && <Changelog repo={changelog} />}
    </>
  )
}

export default PostContent
