import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

const query = graphql`
  query {
    contentYaml {
      title
      tagline
      url
      author {
        name
        twitter
        avatar {
          childImageSharp {
            resize(width: 160) {
              src
            }
          }
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
    defaultTitle={`${siteMeta.title} ¦ ${siteMeta.tagline}`}
    titleTemplate={`%s ¦ ${siteMeta.title}`}
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
      const siteMeta = data.contentYaml
      let title
      let description
      let image
      let postURL

      if (postSEO) {
        const postMeta = post.frontmatter
        title = `${postMeta.title} ¦ ${siteMeta.tagline}`
        description = postMeta.description ? postMeta.description : post.excerpt
        image = postMeta.image
          ? postMeta.image.childImageSharp.fluid.src
          : siteMeta.author.avatar.childImageSharp.resize.src
        postURL = `${siteMeta.url}${slug}`
      } else {
        title = `${siteMeta.title} ¦ ${siteMeta.tagline}`
        description = siteMeta.tagline
        image = siteMeta.author.avatar.childImageSharp.resize.src
      }

      image = `${siteMeta.url}${image}`
      const blogURL = siteMeta.url
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
