import React, { ReactElement } from 'react'
import { toc } from './Toc.module.css'

const PostToc = ({
  tableOfContents
}: {
  tableOfContents: string
}): ReactElement => {
  return (
    <nav
      className={toc}
      dangerouslySetInnerHTML={{ __html: tableOfContents }}
    />
  )
}

export default PostToc
