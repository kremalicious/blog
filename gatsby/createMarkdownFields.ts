import { parse } from 'path'
import { createFilePath } from 'gatsby-source-filesystem'
import config from '../config'
import { Actions, Node, NodePluginArgs } from 'gatsby'

// Create slug, date & github file link for posts from file path values
export function createMarkdownFields(
  node: Node,
  actions: Actions,
  getNode: NodePluginArgs['getNode']
) {
  const { createNodeField } = actions
  const fileNode = getNode(node.parent as string)
  const parsedFilePath = parse(fileNode?.relativePath as string)
  const slugOriginal = createFilePath({ node, getNode })

  createSlug(node, createNodeField, parsedFilePath)
  createDate(node, createNodeField, slugOriginal)

  // github file link
  const type = fileNode?.sourceInstanceName as string
  const file = fileNode?.relativePath as string
  const githubLink = `${config.repoContentPath}/${type}/${file}`

  createNodeField({
    node,
    name: 'githubLink',
    value: githubLink
  })

  createNodeField({
    node,
    name: 'type',
    value: type?.replace('s', '')
  })
}

function createSlug(
  node: Node,
  createNodeField: Actions['createNodeField'],
  parsedFilePath: { name: string; dir: string }
) {
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

function createDate(
  node: Node,
  createNodeField: Actions['createNodeField'],
  slugOriginal: string
) {
  // grab date from file path
  let date = new Date(slugOriginal.substring(1, 11)).toISOString() // grab date from file path

  // allow date overwrite in frontmatter
  if ((node.frontmatter as any).date) {
    date = new Date((node.frontmatter as any).date).toISOString()
  }

  createNodeField({ node, name: 'date', value: date })
}
