const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const { createFilePath } = require('gatsby-source-filesystem')
const { paginate } = require('gatsby-awesome-pagination')
const fastExif = require('fast-exif')

const meta = yaml.load(fs.readFileSync('./content/meta.yml', 'utf8'))
const { itemsPerPage } = meta

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

  // exif
  if (node.internal.mediaType === 'image/jpeg') {
    fastExif
      .read(node.absolutePath)
      .then(exifData => {
        generateExif(exifData, createNodeField, node)
      })
      .catch(() => null) // just silently fail when exif can't be extracted
  }
}

const generateExif = (exifData, createNodeField, node) => {
  const iso = exifData.exif.ISO || null
  const model = exifData.image.Model || null
  const fstop = exifData.exif.FNumber || null
  const shutterspeed = exifData.exif.ExposureTime || null
  const focalLength = exifData.exif.FocalLength || null
  const exposure = exifData.exif.ExposureBiasValue || null

  // add exif fields to type File
  createNodeField({
    node,
    name: 'exif',
    value: {
      iso,
      model,
      fstop,
      shutterspeed,
      focalLength,
      exposure
    }
  })
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
        generateTagPages(createPage, posts)

        resolve()
      })
    )
  })
}

const postsTemplate = path.resolve('src/templates/Posts.jsx')

const generateContent = (createPage, posts) => {
  const postTemplate = path.resolve('src/templates/Post.jsx')

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
    itemsPerPage: itemsPerPage,
    pathPrefix: '/',
    component: postsTemplate
  })
}

const generateTagPages = (createPage, posts) => {
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
    // Create tag pages
    createPage({
      path: `/tag/${tag}/`,
      component: postsTemplate,
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
  //       component: postsTemplate,
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
