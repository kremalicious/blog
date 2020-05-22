import React, { ReactElement } from 'react'
import styles from './Toc.module.scss'

const PostToc = ({
  tableOfContents
}: {
  tableOfContents: string
}): ReactElement => {
  return (
    <nav
      className={styles.toc}
      dangerouslySetInnerHTML={{ __html: tableOfContents }}
    />
  )
}

export default PostToc
