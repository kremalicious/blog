import React from 'react'
import Changelog from '../atoms/Changelog'
import { PostMetadata } from '../../@types/PostMetadata'

// Remove lead paragraph from content
const PostContent = ({ post }: { post: PostMetadata }) => {
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
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {changelog && <Changelog repo={changelog} />}
    </>
  )
}

export default PostContent
