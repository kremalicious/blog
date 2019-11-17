const path = require('path')

module.exports = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'posts',
      path: path.join(__dirname, '..', 'content', 'posts')
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
        Authorization: `bearer ${process.env.GATSBY_GITHUB_TOKEN}`
      },
      // Additional options to pass to node-fetch
      fetchOptions: {},
      refetchInterval: 300 // 5 min.
    }
  }
]
