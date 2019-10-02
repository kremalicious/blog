import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

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

const createSchemaOrg = (
  blogURL: string,
  title: string,
  postSEO: boolean,
  postURL: string,
  image: string,
  description: string
) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title
    }
  ]

  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postURL,
              name: title,
              image
            }
          }
        ]
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: blogURL,
        name: title,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image
        },
        description
      }
    )
  }
  return schemaOrgJSONLD
}

const MetaTags = ({
  description,
  image,
  url,
  schema,
  postSEO,
  title
}: {
  description: string
  image: string
  url: string
  schema: string
  postSEO: boolean
  title: string
}) => {
  const { siteTitle, siteDescription, siteUrl, author } = useSiteMetadata()

  return (
    <Helmet
      defaultTitle={`${siteTitle} ¦ ${siteDescription}`}
      titleTemplate={`%s ¦ ${siteTitle}`}
    >
      <html lang="en" />

      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="canonical" href={url} />

      {/* Schema.org tags */}
      <script type="application/ld+json">{schema}</script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {postSEO && <meta property="og:type" content="article" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={author.twitter ? author.twitter : ''}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link
        rel="alternate"
        title="JSON Feed"
        type="application/json"
        href={`${siteUrl}/feed.json`}
      />
    </Helmet>
  )
}

export default function SEO({
  post,
  slug,
  postSEO
}: {
  post?: any
  slug?: string
  postSEO?: boolean
}) {
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

  let schema = createSchemaOrg(
    blogURL,
    title,
    postSEO,
    postURL,
    image,
    description
  )

  schema = JSON.stringify(schema)

  return (
    <MetaTags
      description={description}
      image={image}
      url={url}
      schema={schema}
      postSEO={postSEO}
      title={title}
    />
  )
}
