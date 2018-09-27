import React from 'react'
import PropTypes from 'prop-types'
import styles from './PostLead.module.scss'

// Extract lead paragraph from content
// Grab everything before more tag, or just first paragraph
const PostLead = ({ post, index }) => {
  let lead
  const content = post.html
  const separator = '<!-- more -->'

  if (post.frontmatter.type === 'post') {
    if (content.includes(separator)) {
      lead = content.split(separator)[0]
    } else {
      lead = content.split('\n')[0]
    }
  } else {
    return null
  }

  return (
    <div
      className={index ? styles.index : styles.lead}
      dangerouslySetInnerHTML={{ __html: lead }}
    />
  )
}

PostLead.propTypes = {
  post: PropTypes.object,
  index: PropTypes.bool
}

export default PostLead
