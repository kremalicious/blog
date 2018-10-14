const path = require('path')
const postsTemplate = path.resolve('src/templates/Posts.jsx')

const redirects = [
  { f: '/feed', t: '/feed.xml' },
  { f: '/feed/', t: '/feed.xml' }
]

exports.generatePostPages = (createPage, posts, numPages) => {
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
        limit: numPages,
        skip: i * numPages,
        numPages,
        currentPageNumber: i + 1,
        prevPage: i - 1,
        nextPage: i + 2
      }
    })
  })
}

exports.generateTagPages = (createPage, posts) => {
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

exports.generateRedirectPages = createRedirect => {
  redirects.forEach(({ f, t }) => {
    createRedirect({
      fromPath: f,
      redirectInBrowser: true,
      toPath: t
    })
  })
}

//
// ----------------------
//
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
