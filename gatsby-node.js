const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { paginate } = require('gatsby-awesome-pagination')

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
    resolve(
      graphql(
        `
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
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        // Generate posts & posts index
        generateContent(createPage, posts)

        // Generate Tag Pages
        createTagPages(createPage, posts)

        resolve()
      })
    )
  })
}

const generateContent = (createPage, posts) => {
  const postTemplate = path.resolve('src/templates/Post.jsx')
  const postsTemplate = path.resolve('src/templates/Posts.jsx')

  // Create Post pages
  posts.forEach(post => {
    createPage({
      path: `${post.node.fields.slug}`,
      component: postTemplate,
      context: {
        slug: post.node.fields.slug
      }
    })
  })

  // Create paginated front page
  paginate({
    createPage,
    items: posts,
    itemsPerPage: 5,
    pathPrefix: '/',
    component: postsTemplate
  })
}

const createTagPages = (createPage, posts) => {
  const archiveTemplate = path.resolve('src/templates/Archive.jsx')

  const tagSet = new Set()
  const tagMap = new Map()

  posts.forEach(post => {
    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag)

        const array = tagMap.has(tag) ? tagMap.get(tag) : []
        array.push(post)
        tagMap.set(tag, array)
      })
    }
  })

  const tagList = Array.from(tagSet)

  tagList.forEach(tag => {
    // Create paginated tag pages
    // paginate({
    //   createPage,
    //   items: tagList, // An array of objects
    //   itemsPerPage: 5,
    //   pathPrefix: `/tag/${tag.toLowerCase()}`,
    //   component: archiveTemplate
    // })
    createPage({
      path: `/tag/${tag}/`,
      component: archiveTemplate,
      context: { tag }
    })
  })

  // Object.keys(posts).forEach(tagName => {
  //   const pageSize = 5
  //   const pagesSum = Math.ceil(posts[tagName].length / pageSize)

  //   for (let page = 1; page <= pagesSum; page++) {
  //     createPage({
  //       path:
  //         page === 1
  //           ? `/tag/${tagName.toLowerCase()}`
  //           : `/tag/${tagName.toLowerCase()}/page/${page}`,
  //       component: tagTemplate,
  //       context: {
  //         posts: paginate(posts[tagName], pageSize, page),
  //         tag: tagName,
  //         pagesSum,
  //         page
  //       }
  //     })
  //   }
  // })
}

// function paginate(array, page_size, page_number) {
//   return array
//     .slice(0)
//     .slice((page_number - 1) * page_size, page_number * page_size)
// }