const { createMarkdownFields } = require('./gatsby/createMarkdownFields')
const { createExif } = require('./gatsby/createExif')
const {
  generatePostPages,
  generateTagPages,
  generateRedirectPages
} = require('./gatsby/createPages')
const { generateJsonFeed } = require('./gatsby/feeds')

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  // Markdown files
  if (node.internal.type === 'MarkdownRemark') {
    createMarkdownFields(node, actions, getNode)
  }

  // Image files
  if (node.internal.mediaType === 'image/jpeg') {
    createExif(node, actions, createNodeId)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const result = await graphql(`
    {
      posts: allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
        edges {
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }

      tags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const posts = result.data.posts.edges
  const tags = result.data.tags.group

  // Generate posts & posts index
  generatePostPages(createPage, posts)

  // Generate tag pages
  generateTagPages(createPage, tags)

  // Create manual redirects
  generateRedirectPages(createRedirect)
}

exports.onPostBuild = async ({ graphql }) => {
  // JSON Feed query
  const result = await graphql(`
    {
      allMarkdownRemark {
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
              tags
              updated
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
  `)

  if (result.errors) throw result.errors

  // Generate json feed
  await generateJsonFeed(result.data.allMarkdownRemark.edges)

  return Promise.resolve()
}
