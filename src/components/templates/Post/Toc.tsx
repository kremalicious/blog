import React, { ReactElement } from 'react'
import * as styles from './Toc.module.css'

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
