import React from 'react'
import styles from './PostToc.module.scss'

const PostToc = ({ tableOfContents }: { tableOfContents: string }) => {
  return (
    <nav
      className={styles.toc}
      dangerouslySetInnerHTML={{ __html: tableOfContents }}
    />
  )
}

export default PostToc
