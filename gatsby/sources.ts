import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config()

if (!process.env.GITHUB_TOKEN) {
  // eslint-disable-next-line
  console.warn(`

      ⚠️  A GitHub token as GITHUB_TOKEN is required to build some parts of the blog.
      ⚠️  Check the README https://github.com/kremalicious/blog#-development.

  `)
}

export default [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'articles',
      path: path.join(__dirname, '..', 'content', 'articles')
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'photos',
      path: path.join(__dirname, '..', 'content', 'photos')
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'links',
      path: path.join(__dirname, '..', 'content', 'links')
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'media',
      path: path.join(__dirname, '..', 'content', 'media')
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: path.join(__dirname, '..', 'src', 'images')
    }
  },
  {
    resolve: 'gatsby-source-graphql',
    options: {
      typeName: 'GitHub',
      fieldName: 'github',
      url: 'https://api.github.com/graphql',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
      // Additional options to pass to node-fetch
      // fetchOptions: {},
      // refetchInterval: 300 // 5 min.
    }
  }
]
