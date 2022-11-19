import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getSrc, ImageDataLike } from 'gatsby-plugin-image'
import { useSiteMetadata } from '../../../hooks/use-site-metadata'
import useDarkMode from '../../../hooks/useDarkMode'

const query = graphql`
  query Logo {
    logo: allFile(filter: { name: { eq: "apple-touch-icon" } }) {
      edges {
        node {
          relativePath
        }
      }
    }
  }
`

export type HeadMetaProps = {
  title?: string
  description?: string
  image?: ImageDataLike
  slug: string
  children?: ReactElement
}

export default function HeadMeta(props: HeadMetaProps): ReactElement {
  const data = useStaticQuery<Queries.LogoQuery>(query)
  const logo = data.logo.edges[0].node.relativePath
  const { siteTitle, siteUrl, siteDescription, author } = useSiteMetadata()
  const { themeColor } = useDarkMode()

  const title = props.title
    ? `${props.title} ¦ ${siteTitle}`
    : `${siteTitle} ¦ ${siteDescription}`
  const description = props.description
    ? props.description.slice(0, 160)
    : siteDescription
  const url = props.slug ? `${siteUrl}${props.slug}` : siteUrl
  const image = props.image
    ? `${siteUrl}${getSrc(props.image)}`
    : `${siteUrl}${logo}`

  return (
    <>
      <link rel="canonical" href={url} />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author.twitter} />

      <meta name="theme-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      <link
        rel="alternate"
        title="JSON Feed"
        type="application/json"
        href={`${siteUrl}/feed.json`}
      />
      {props.children}
    </>
  )
}
