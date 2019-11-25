const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { repoContentPath } = require('../config')

// Create slug, date & github file link for posts from file path values
exports.createMarkdownFields = (node, actions, getNode) => {
  const { createNodeField } = actions
  const fileNode = getNode(node.parent)
  const parsedFilePath = path.parse(fileNode.relativePath)
  const slugOriginal = createFilePath({ node, getNode })

  createSlug(node, createNodeField, parsedFilePath)
  createDate(node, createNodeField, slugOriginal)

  // github file link
  const type = fileNode.sourceInstanceName
  const file = fileNode.relativePath
  const githubLink = `${repoContentPath}/${type}/${file}`

  createNodeField({
    node,
    name: 'githubLink',
    value: githubLink
  })
}

function createSlug(node, createNodeField, parsedFilePath) {
  let slug

  if (parsedFilePath.name === 'index') {
    slug = `/${parsedFilePath.dir.substring(11)}` // remove date from file dir
  } else {
    slug = `/${parsedFilePath.name.substring(11)}` // remove date from file path
  }

  createNodeField({
    node,
    name: 'slug',
    value: slug
  })
}

function createDate(node, createNodeField, slugOriginal) {
  // grab date from file path
  let date = new Date(slugOriginal.substring(1, 11)).toISOString() // grab date from file path

  if (node.frontmatter.date) {
    date = new Date(node.frontmatter.date).toISOString()
  }

  createNodeField({
    node,
    name: 'date',
    value: date
  })
}
