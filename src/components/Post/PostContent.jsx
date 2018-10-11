import React from 'react'
import PropTypes from 'prop-types'

// Remove lead paragraph from content
const PostContent = ({ post }) => {
  let content
  const separator = '<!-- more -->'

  content = post.html

  if (post.frontmatter.type === 'post') {
    if (content.includes(separator)) {
      content = content.split(separator)[1]
    } else {
      const lead = content.split('\n')[0]
      content = content.replace(lead, '')
    }
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

PostContent.propTypes = {
  post: PropTypes.object
}

export default PostContent
