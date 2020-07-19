const { createMarkdownFields } = require('./gatsby/createMarkdownFields')
const { createExif } = require('./gatsby/createExif')
const {
  generatePostPages,
  generateTagPages,
  generateRedirectPages,
  generateArchivePages,
  generatePhotosPages
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

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  const result = await graphql(`
    {
      all: allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
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

      photos: allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "photo" } } }
      ) {
        edges {
          node {
            id
          }
        }
      }

      archive: allMarkdownRemark(
        filter: { frontmatter: { type: { ne: "photo" } } }
      ) {
        edges {
          node {
            id
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

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const all = result.data.all.edges
  const photosLength = result.data.photos.edges.length
  const archiveLength = result.data.archive.edges.length
  const tags = result.data.tags.group

  // Generate post pages
  generatePostPages(createPage, all)

  // Generate archive pages
  generateArchivePages(createPage, archiveLength)

  // Generate archive pages
  generatePhotosPages(createPage, photosLength)

  // Generate tag pages
  generateTagPages(createPage, tags)

  // Create manual redirects
  generateRedirectPages(createRedirect)
}

exports.onPostBuild = async ({ graphql }) => {
  // JSON Feed query
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
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
