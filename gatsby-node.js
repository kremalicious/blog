const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const { createFilePath } = require('gatsby-source-filesystem')
const fastExif = require('fast-exif')
const Fraction = require('fraction.js')
const dms2dec = require('dms2dec')

const meta = yaml.load(fs.readFileSync('./content/meta.yml', 'utf8'))
const { itemsPerPage } = meta

const redirects = [
  { f: '/feed', t: '/feed.xml' },
  { f: '/feed/', t: '/feed.xml' }
]

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
  const {
    GPSLatitudeRef,
    GPSLatitude,
    GPSLongitudeRef,
    GPSLongitude
  } = exifData.gps

  const { n, d } = new Fraction(ExposureTime)
  const exposureShortened = parseFloat(ExposureBiasValue.toFixed(2))

  const model = `${Model}`
  const iso = `ISO ${ISO}`
  const fstop = `ƒ ${FNumber}`
  const shutterspeed = `${n}/${d}s`
  const focalLength = `${FocalLength}mm`

  const GPSdec = dms2dec(
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef
  )

  const latitude = GPSdec[0]
  const longitude = GPSdec[1]

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
      exposure,
      gps: {
        latitude,
        longitude
      }
    }
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

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
        const numPages = Math.ceil(posts.length / itemsPerPage)

        // Generate posts & posts index
        generateContent(createPage, posts, numPages)

        // Generate Tag Pages
        generateTagPages(createPage, posts, numPages)

        // create manual redirects
        redirects.forEach(({ f, t }) => {
          createRedirect({
            fromPath: f,
            redirectInBrowser: true,
            toPath: t
          })
        })

        resolve()
      })
    )
  })
}

const postsTemplate = path.resolve('src/templates/Posts.jsx')

const generateContent = (createPage, posts, numPages) => {
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

  // Create paginated Blog index pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/page/${i + 1}`,
      component: postsTemplate,
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPageNumber: i + 1,
        prevPage: i - 1,
        nextPage: i + 2
      }
    })
  })
}

const generateTagPages = (createPage, posts) => {
  const tagList = arrayReducer(posts, 'tags')

  tagList.forEach(tag => {
    if (tag === 'goodies') return

    // Create tag pages
    createPage({
      path: `/tags/${tag}/`,
      component: postsTemplate,
      context: { tag }
    })
  })
}

// https://www.adamjberkowitz.com/tags-and-categories-in-gatsby-js/
const arrayReducer = (postsArray, type) => {
  return (postsArray = postsArray
    .map(({ node }) => {
      return node.frontmatter[type]
    })
    .reduce((a, b) => {
      return a.concat(b)
    }, [])
    .filter((type, index, array) => {
      return array.indexOf(type) === index
    })
    .sort())
}
