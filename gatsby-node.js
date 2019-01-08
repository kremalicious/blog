const webpack = require('webpack')
const { createMarkdownFields } = require('./gatsby/createMarkdownFields')
const { createExifFields } = require('./gatsby/createExifFields')
const {
  generatePostPages,
  generateTagPages,
  generateRedirectPages
} = require('./gatsby/createPages')
const { itemsPerPage } = require('./config')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Markdown files
  if (node.internal.type === 'MarkdownRemark') {
    createMarkdownFields(node, createNodeField, getNode)
  }

  // Image files
  if (node.internal.mediaType === 'image/jpeg') {
    createExifFields(node, createNodeField)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
              date
            }
            frontmatter {
              type
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const posts = result.data.allMarkdownRemark.edges
  const numPages = Math.ceil(posts.length / itemsPerPage)

  // Generate posts & posts index
  generatePostPages(createPage, posts, numPages)

  // Generate Tag Pages
  generateTagPages(createPage, posts, numPages)

  // create manual redirects
  generateRedirectPages(createRedirect)
}

// Fix web3
// https://github.com/ethereum/web3.js/issues/1105#issuecomment-446039296
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // replace native `scrypt` module with pure js `js-scrypt`
        scrypt: 'js-scrypt'
      }
    },
    plugins: [
      // ignore these plugins completely
      new webpack.IgnorePlugin(/^(?:electron|ws)$/)
    ]
  })
}
