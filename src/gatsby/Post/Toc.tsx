import React, { ReactElement } from 'react'
import styles from './Toc.module.css'

const PostToc = ({
  tableOfContents
}: {
  tableOfContents: string
}): ReactElement => {
  return (
    <nav
      aria-label="Table of Contents"
      className={styles.toc}
      dangerouslySetInnerHTML={{ __html: tableOfContents }}
    />
  )
}

export default PostToc
