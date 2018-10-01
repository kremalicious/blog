import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

const query = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
        siteDescription
        siteUrl
        author {
          name
          twitter
        }
      }
    }

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
  blogURL,
  title,
  siteMeta,
  postSEO,
  postURL,
  image,
  description
) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title,
      alternateName: siteMeta.titleAlt ? siteMeta.titleAlt : ''
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
        alternateName: siteMeta.titleAlt ? siteMeta.titleAlt : '',
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
  title,
  siteMeta
}) => (
  <Helmet
    defaultTitle={`${siteMeta.siteTitle} ¦ ${siteMeta.siteDescription}`}
    titleTemplate={`%s ¦ ${siteMeta.siteTitle}`}
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
      content={siteMeta.author.twitter ? siteMeta.author.twitter : ''}
    />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
)

MetaTags.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  schema: PropTypes.string,
  postSEO: PropTypes.bool,
  title: PropTypes.string,
  siteMeta: PropTypes.object
}

const SEO = ({ post, slug, postSEO }) => (
  <StaticQuery
    query={query}
    render={data => {
      const siteMeta = data.site.siteMetadata
      const logo = data.logo.edges[0].node.relativePath

      let title
      let description
      let image
      let postURL

      if (postSEO) {
        const postMeta = post.frontmatter
        title = `${postMeta.siteTitle} ¦ ${siteMeta.siteDescription}`
        description = postMeta.description ? postMeta.description : post.excerpt
        image = postMeta.image ? postMeta.image.childImageSharp.fluid.src : logo
        postURL = `${siteMeta.siteUrl}${slug}`
      } else {
        title = `${siteMeta.siteTitle} ¦ ${siteMeta.siteDescription}`
        description = siteMeta.siteDescription
        image = logo
      }

      image = `${siteMeta.siteUrl}${image}`
      const blogURL = siteMeta.siteUrl
      const url = postSEO ? postURL : blogURL

      let schema = createSchemaOrg(
        blogURL,
        title,
        siteMeta,
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
          siteMeta={siteMeta}
        />
      )
    }}
  />
)

SEO.propTypes = {
  post: PropTypes.object,
  slug: PropTypes.string,
  postSEO: PropTypes.bool
}

export default SEO
