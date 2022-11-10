import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import { useSiteMetadata } from '../../../hooks/use-site-metadata'
import MetaTags from './MetaTags'

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

export interface SeoPost {
  frontmatter: {
    title: string
    description?: string
    image?: any
    updated?: string
  }
  fields?: {
    date: string
  }
  excerpt?: string
}

export default function SEO({
  post,
  slug
}: {
  post?: SeoPost
  slug?: string
}): ReactElement {
  const data = useStaticQuery<Queries.LogoQuery>(query)
  const logo = data.logo.edges[0].node.relativePath
  const { siteTitle, siteUrl, siteDescription } = useSiteMetadata()

  let title: string
  let description: string
  let image: string
  let postURL: string

  if (post) {
    const postMeta = post.frontmatter
    title = `${postMeta.title} ¦ ${siteTitle}`
    description = postMeta.description ? postMeta.description : post.excerpt
    image = postMeta.image ? getSrc(postMeta.image) : `/${logo}`
    postURL = `${siteUrl}${slug}`
  } else {
    title = `${siteTitle} ¦ ${siteDescription}`
    description = siteDescription
    image = `/${logo}`
  }

  image = `${siteUrl}${image}`
  const blogURL = siteUrl
  const url = post ? postURL : blogURL

  return (
    <MetaTags
      description={description}
      image={image}
      url={url || ''}
      postSEO={Boolean(post)}
      title={title}
      datePublished={post?.fields && post.fields.date}
      dateModified={post?.frontmatter.updated}
    />
  )
}
