import React, { ReactElement } from 'react'
import {
  title as styleTitle,
  titleLink,
  linkurl as styleLinkurl
} from './Title.module.css'
import Icon from '../../atoms/Icon'
import PostDate from '../../molecules/PostDate'

export default function PostTitle({
  linkurl,
  title,
  date,
  updated,
  className
}: {
  linkurl?: string
  title: string
  date?: string
  updated?: string
  className?: string
}): ReactElement {
  const linkHostname = linkurl ? new URL(linkurl).hostname : null

  return linkurl ? (
    <>
      <h1 className={`${styleTitle} ${titleLink} ${className && className}`}>
        <a href={linkurl} title={`Go to source: ${linkurl}`}>
          {title} <Icon name="ExternalLink" />
        </a>
      </h1>
      <div className={styleLinkurl}>{linkHostname}</div>
    </>
  ) : (
    <>
      <h1 className={`${styleTitle} ${className && className}`}>{title}</h1>
      {date && <PostDate date={date} updated={updated} />}
    </>
  )
}
