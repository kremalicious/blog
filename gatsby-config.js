const path = require('path')
const siteConfig = require('./config')

// required for gatsby-plugin-meta-redirect
require('regenerator-runtime/runtime')

module.exports = {
  siteMetadata: {
    ...siteConfig
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, 'content', 'posts')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'photos',
        path: path.join(__dirname, 'content', 'photos')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'media',
        path: path.join(__dirname, 'content', 'media')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images')
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- more -->',
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 630,
              quality: 80,
              withWebp: true,
              linkImagesToOriginal: false,
              sizeByPixelDensity: true,
              showCaptions: true,
              backgroundColor: '#e7eef4'
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'media'
            }
          },
          {
            resolve: 'gatsby-remark-highlights',
            options: {
              codeWrap: {
                className: 'nord'
              }
            }
          },
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [`${__dirname}/node_modules`, `${__dirname}/src/styles`]
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true
      }
    },
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [
          {
            // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            name: 'en'
          }
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'tags', attributes: { boost: 15 } },
          { name: 'slug', store: true },
          { name: 'excerpt', attributes: { boost: 10 } },
          { name: 'content' }
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            excerpt: node => node.excerpt,
            tags: node => node.frontmatter.tags,
            content: node => node.rawMarkdownBody,
            slug: node => node.fields.slug
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://analytics.kremalicious.com',
        siteUrl: `${siteConfig.siteUrl}`
      }
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/apple-touch-icon.png',

        // WebApp Manifest Configuration
        appName: siteConfig.siteTitle.toLowerCase(),
        appDescription: siteConfig.siteDescription,
        developerName: siteConfig.author.name,
        developerURL: siteConfig.author.uri,
        dir: 'auto',
        lang: 'en-US',
        background: siteConfig.backgroundColor,
        theme_color: siteConfig.themeColor,
        display: 'minimal-ui',
        orientation: 'any',
        start_url: '/?homescreen=1',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteTitle
                siteDescription
                siteUrl
                title: siteTitle
                description: siteDescription
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => ({
                title: edge.node.frontmatter.title,
                date: edge.node.fields.date,
                description: feedContent(edge),
                url: siteConfig.siteUrl + edge.node.fields.slug,
                categories: edge.node.frontmatter.tags,
                author: siteConfig.author.name,
                guid: siteConfig.siteUrl + edge.node.fields.slug
              }))
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [fields___date] },
                  limit: 20
                ) {
                  edges {
                    node {
                      html
                      fields { slug, date }
                      frontmatter {
                        title
                        image {
                          childImageSharp {
                            resize(width: 940, quality: 85) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/feed.xml'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/page/*', '/tag/*']
      }
    },
    'gatsby-plugin-webpack-size',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline'
  ]
}

const feedContent = edge => {
  const { image } = edge.node.frontmatter
  const { html } = edge.node
  const footer =
    '<hr />This post was published on <a href="https://kremalicious.com">kremalicious.com</a>'

  return image
    ? `<img src="${image.childImageSharp.resize.src}" /><br />${html}${footer}`
    : `${html}${footer}`
}
