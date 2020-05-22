import React, { ReactElement } from 'react'
import styles from './Lead.module.scss'
import { Post } from '../../../@types/Post'

// Extract lead paragraph from content
// Grab everything before more tag, or just first paragraph
const PostLead = ({
  post,
  index
}: {
  post: Post
  index?: boolean
}): ReactElement => {
  let lead
  const content = post.html
  const separator = '<!-- more -->'

  if (content.includes(separator)) {
    lead = content.split(separator)[0]
  } else {
    lead = content.split('\n')[0]
  }

  return (
    <div
      className={index ? styles.index : styles.lead}
      dangerouslySetInnerHTML={{ __html: lead }}
    />
  )
}

export default PostLead
