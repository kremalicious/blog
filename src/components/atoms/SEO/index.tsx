import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { useSiteMetadata } from '../../../hooks/use-site-metadata'
import { Post } from '../../../@types/Post'
import MetaTags from './MetaTags'

const query = graphql`
  query {
    logo: allFile(filter: { name: { eq: "apple-touch-icon" } }) {
      edges {
        node {
          relativePath
        }
      }
    }
  }
`

export default function SEO({
  post,
  slug,
  postSEO
}: {
  post?: Post
  slug?: string
  postSEO?: boolean
}): ReactElement {
  const data = useStaticQuery(query)
  const logo = data.logo.edges[0].node.relativePath
  const { siteTitle, siteUrl, siteDescription } = useSiteMetadata()

  let title
  let description
  let image
  let postURL

  if (postSEO) {
    const postMeta = post.frontmatter
    title = `${postMeta.title} ¦ ${siteTitle}`
    description = postMeta.description ? postMeta.description : post.excerpt
    image = postMeta.image
      ? postMeta.image.childImageSharp.fluid.src
      : `/${logo}`
    postURL = `${siteUrl}${slug}`
  } else {
    title = `${siteTitle} ¦ ${siteDescription}`
    description = siteDescription
    image = `/${logo}`
  }

  image = `${siteUrl}${image}`
  const blogURL = siteUrl
  const url = postSEO ? postURL : blogURL

  return (
    <MetaTags
      description={description}
      image={image}
      url={url}
      postSEO={postSEO}
      title={title}
      datePublished={post && post.fields && post.fields.date}
      dateModified={post && post.frontmatter.updated}
    />
  )
}
