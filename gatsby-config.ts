import type { GatsbyConfig } from 'gatsby'
import 'dotenv/config'
// required for gatsby-plugin-meta-redirect
import 'regenerator-runtime/runtime'
import siteConfig from './config'
import { feedContent } from './gatsby/feeds'
import sources from './gatsby/sources'

//import algolia from './gatsby/algolia'

const config: GatsbyConfig = {
  graphqlTypegen: {
    typesOutputPath: './src/@types/Gatsby.d.ts',
    generateOnBuild: true
  },
  siteMetadata: {
    ...siteConfig
  },
  plugins: [
    ...sources,
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        stripMetadata: false,
        defaults: {
          quality: 85
        }
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- more -->',
        plugins: [
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 666,
              quality: 80,
              linkImagesToOriginal: false,
              showCaptions: true,
              backgroundColor: 'none',
              disableBgImageOnAlpha: true
            }
          },
          {
            resolve: 'gatsby-remark-images-medium-zoom',
            options: {
              background: '#e7eef4'
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'media'
            }
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: '<span>#</span>'
            }
          },
          {
            // https://github.com/andrewbranch/gatsby-remark-vscode
            resolve: 'gatsby-remark-vscode',
            options: {
              theme: {
                default: 'Polar',
                parentSelector: { 'html.dark': 'Nord' }
              },
              injectStyles: false,
              extensions: [
                'nord-visual-studio-code',
                `${__dirname}/vendor/polar-0.0.6.vsix`
              ],
              languageAliases: {}
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: { overrides: { removeViewBox: false } }
            }
          ]
        }
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
          { name: 'title', attributes: { boost: 20 } },
          { name: 'tags', attributes: { boost: 15 } },
          { name: 'excerpt', attributes: { boost: 10 } },
          { name: 'slug', store: true },
          { name: 'content' }
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: (node) => node.frontmatter.title,
            excerpt: (node) => node.excerpt,
            tags: (node) => node.frontmatter.tags,
            content: (node) => node.rawMarkdownBody,
            slug: (node) => node.fields.slug
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteConfig.siteTitle,
        start_url: '/',
        background_color: siteConfig.backgroundColor,
        theme_color: siteConfig.themeColor,
        icon: 'src/images/apple-touch-icon.png',
        display: 'standalone',
        cache_busting_mode: 'name',
        theme_color_in_head: false // dynamically set in ThemeSwitch
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
            serialize: ({ query }: { query: Queries.AllContentFeedQuery }) => {
              return query.allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter?.title,
                  date: edge.node.fields?.date,
                  description: edge.node.excerpt,
                  url: siteConfig.siteUrl + edge.node.fields?.slug,
                  categories: edge.node.frontmatter?.tags,
                  author: siteConfig.author.name,
                  guid: siteConfig.siteUrl + edge.node.fields?.slug,
                  custom_elements: [{ 'content:encoded': feedContent(edge) }]
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {fields: {date: DESC}}, limit: 40) {
                edges {
                  node {
                    html
                    fields {
                      slug
                      date
                    }
                    excerpt
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
            }`,
            output: '/feed.xml',
            title: siteConfig.siteTitle
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/archive', '/archive/**/*', '/thanks', '/tags']
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect'
    // { ...algolia }
  ]
}

export default config
