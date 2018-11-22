import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Changelog from '../atoms/Changelog'

// Remove lead paragraph from content
const PostContent = ({ post }) => {
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
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {changelog && <Changelog repo={changelog} />}
    </Fragment>
  )
}

PostContent.propTypes = {
  post: PropTypes.object
}

export default PostContent
