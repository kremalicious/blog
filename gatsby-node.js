const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const { createFilePath } = require('gatsby-source-filesystem')
const { paginate } = require('gatsby-awesome-pagination')
const fastExif = require('fast-exif')
const Fraction = require('fraction.js')

const meta = yaml.load(fs.readFileSync('./content/meta.yml', 'utf8'))
const { itemsPerPage } = meta

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Markdown files
  if (node.internal.type === 'MarkdownRemark') {
    createMarkdownNodeFields(node, createNodeField, getNode)
  }

  // Image files
  if (node.internal.mediaType === 'image/jpeg') {
    readAndCreateExifFields(node, createNodeField)
  }
}

// Create slug & date for posts from file path values
const createMarkdownNodeFields = (node, createNodeField, getNode) => {
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

const readAndCreateExifFields = (node, createNodeField) => {
  fastExif
    .read(node.absolutePath, true)
    .then(exifData => {
      if (!exifData) return
      createExifFields(exifData, createNodeField, node)
    })
    .catch(() => null) // just silently fail when exif can't be extracted
}

const createExifFields = (exifData, createNodeField, node) => {
  const { Model } = exifData.image
  const {
    ISO,
    FNumber,
    ExposureTime,
    FocalLength,
    ExposureBiasValue
  } = exifData.exif

  const { n, d } = new Fraction(ExposureTime)
  const exposureShortened = parseFloat(ExposureBiasValue.toFixed(2))

  const model = `${Model}`
  const iso = `ISO ${ISO}`
  const fstop = `ƒ ${FNumber}`
  const shutterspeed = `${n}/${d}s`
  const focalLength = `${FocalLength}mm`

  let exposure

  if (ExposureBiasValue === 0) {
    exposure = `+/- ${exposureShortened} ev`
  } else if (ExposureBiasValue > 0) {
    exposure = `+ ${exposureShortened} ev`
  } else {
    exposure = `${exposureShortened} ev`
  }

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
    if (tag === 'goodies') return

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
