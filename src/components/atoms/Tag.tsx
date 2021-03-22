import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import { tag, count as styleCount } from './Tag.module.css'

export default function Tag({
  name,
  url,
  count,
  style
}: {
  name: string
  url: string
  count?: number
  style?: any
}): ReactElement {
  return (
    <Link className={tag} to={url} style={style}>
      {name}
      {count && <span className={styleCount}>{count}</span>}
    </Link>
  )
}
