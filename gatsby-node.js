const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// Create slug & date for posts from file path values
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    const slugOriginal = createFilePath({ node, getNode })

    // slug
    let slug

    if (parsedFilePath.name === 'index') {
      slug = `/${parsedFilePath.dir.substring(11)}` // remove date from file dir
    } else {
      slug = `/${slugOriginal.substring(12)}` // remove first slash & date from file path
    }

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
      date = `${slugOriginal.substring(1, 10)}` // grab date from file path
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
    const archiveTemplate = path.resolve('src/templates/Archive.jsx')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [fields___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    date
                  }
                  frontmatter {
                    category
                    tags
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

        // Create Posts
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach(post => {
          createPage({
            path: `${post.node.fields.slug}`,
            component: postTemplate,
            context: {
              slug: post.node.fields.slug
            }
          })
        })

        // Category & Tag Pages
        const tagSet = new Set()
        const tagMap = new Map()
        const categorySet = new Set()

        posts.forEach(post => {
          if (post.node.frontmatter.tags) {
            post.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag)

              const array = tagMap.has(tag) ? tagMap.get(tag) : []
              array.push(post)
              tagMap.set(tag, array)
            })
          }

          if (post.node.frontmatter.category) {
            categorySet.add(post.node.frontmatter.category)
          }
        })

        const tagList = Array.from(tagSet)

        tagList.forEach(tag => {
          createPage({
            path: `/tag/${tag}/`,
            component: archiveTemplate,
            context: { tag }
          })
        })

        const categoryList = Array.from(categorySet)

        categoryList.forEach(category => {
          createPage({
            path: `/${category}/`,
            component: archiveTemplate,
            context: { category }
          })
        })

        resolve()
      })
    )
  })
}
