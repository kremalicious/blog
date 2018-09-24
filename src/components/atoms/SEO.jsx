import React, { Component } from 'react'
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

class SEO extends Component {
  static propTypes = {
    post: PropTypes.object,
    slug: PropTypes.string,
    postSEO: PropTypes.bool
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const siteMeta = data.contentYaml
          const { post, slug, postSEO } = this.props
          let title
          let description
          let image
          let postURL

          if (postSEO) {
            const postMeta = post.frontmatter
            title = `${postMeta.title} ¦ ${siteMeta.tagline}`
            description = postMeta.description
              ? postMeta.description
              : post.excerpt
            image = postMeta.image.childImageSharp.fluid.src
            postURL = `${siteMeta.url}${slug}`
          } else {
            title = `${siteMeta.title} ¦ ${siteMeta.tagline}`
            description = siteMeta.tagline
            image = siteMeta.author.avatar.childImageSharp.resize.src
          }

          image = `${siteMeta.url}${image}`
          const blogURL = siteMeta.url
          const url = postSEO ? postURL : blogURL

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

          return (
            <Helmet>
              <html lang="en" />

              {/* General tags */}
              <meta name="description" content={description} />
              <meta name="image" content={image} />
              <link rel="canonical" href={url} />

              {/* Schema.org tags */}
              <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
              </script>

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
        }}
      />
    )
  }
}

export default SEO
