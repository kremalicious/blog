const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// Create slug & date for posts from file path
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    // slug
    const slugOriginal = createFilePath({ node, getNode })
    const slug = `/${slugOriginal.substring(12)}` // remove date from file path

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    // date
    let date

    if (node.frontmatter.date) {
      date = `${node.frontmatter.date}`
    } else {
      date = `${parsedFilePath.name.substring(0, 10)}`
    }

    createNodeField({
      node,
      name: 'date',
      value: date
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/Post.jsx')
    // const indexTemplate = path.resolve('src/templates/index.jsx')
    // const tagPage = path.resolve('src/templates/tag.jsx')
    // const categoryPage = path.resolve('src/templates/category.jsx')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors)
          reject(result.errors)
        }

        // Creates Index page
        // createPaginatedPages({
        //   edges: result.data.allMarkdownRemark.edges,
        //   createPage: createPage,
        //   pageTemplate: indexTemplate
        // })

        // Create Posts
        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: `${edge.node.fields.slug}`,
            component: postTemplate,
            context: {
              slug: edge.node.fields.slug
            }
          })
        })

        // const tagSet = new Set()
        // const tagMap = new Map()
        // const categorySet = new Set()

        // result.data.allMarkdownRemark.edges.forEach(edge => {
        //   if (edge.node.frontmatter.tags) {
        //     edge.node.frontmatter.tags.forEach(tag => {
        //       tagSet.add(tag)

        //       const array = tagMap.has(tag) ? tagMap.get(tag) : []
        //       array.push(edge)
        //       tagMap.set(tag, array)
        //     })
        //   }

        //   if (edge.node.frontmatter.category) {
        //     categorySet.add(edge.node.frontmatter.category)
        //   }
        // })

        // const tagFormatter = tag => route =>
        //   `/tags/${_.kebabCase(tag)}/${route !== 1 ? route : ''}`
        // const tagList = Array.from(tagSet)
        // tagList.forEach(tag => {
        //   // Creates tag pages
        //   createPaginationPages({
        //     createPage,
        //     edges: tagMap.get(tag),
        //     component: tagPage,
        //     pathFormatter: tagFormatter(tag),
        //     limit: siteConfig.sitePaginationLimit,
        //     context: {
        //       tag
        //     }
        //   })
        // })

        // const categoryList = Array.from(categorySet)
        // categoryList.forEach(category => {
        //   createPage({
        //     path: `/categories/${_.kebabCase(category)}/`,
        //     component: categoryPage,
        //     context: {
        //       category
        //     }
        //   })
        // })

        resolve()
      })
    )
  })
}
