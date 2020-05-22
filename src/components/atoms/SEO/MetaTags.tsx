import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../../../hooks/use-site-metadata'
import schemaOrg from './schemaOrg'

function feedLinks(siteUrl: string) {
  return (
    <link
      rel="alternate"
      title="JSON Feed"
      type="application/json"
      href={`${siteUrl}/feed.json`}
    />
  )
}

export default function MetaTags({
  description,
  image,
  url,
  postSEO,
  title,
  datePublished,
  dateModified
}: {
  description: string
  image: string
  url: string
  postSEO: boolean
  title: string
  datePublished: string
  dateModified: string
}): ReactElement {
  const { siteTitle, siteDescription, siteUrl, author } = useSiteMetadata()

  return (
    <Helmet
      defaultTitle={`${siteTitle} ¦ ${siteDescription}`}
      titleTemplate={`%s ¦ ${siteTitle}`}
    >
      <html lang="en" />

      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="canonical" href={url} />

      {schemaOrg(
        siteUrl,
        title,
        postSEO,
        url,
        image,
        description,
        author.name,
        datePublished,
        dateModified
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle}></meta>
      {postSEO && <meta property="og:type" content="article" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={author.twitter ? author.twitter : ''}
      />

      {feedLinks(siteUrl)}
    </Helmet>
  )
}
