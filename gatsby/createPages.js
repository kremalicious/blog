const path = require('path')
const postsTemplate = path.resolve('src/components/templates/Posts.tsx')
const { itemsPerPage } = require('../config')

const redirects = [
  { f: '/feed', t: '/feed.xml' },
  { f: '/feed/', t: '/feed.xml' },
  { f: '/goodies/', t: '/tags/goodies/' }
]

function getPaginationData(i, numPages, slug) {
  const currentPage = i + 1
  const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
  const nextPageNumber = currentPage + 1 > numPages ? null : currentPage + 1
  const prevPagePath = prevPageNumber
    ? prevPageNumber === 1
      ? slug
      : `${slug}page/${prevPageNumber}/`
    : null
  const nextPagePath = nextPageNumber ? `${slug}page/${nextPageNumber}/` : null
  const path = i === 0 ? slug : `${slug}page/${i + 1}`

  return { prevPagePath, nextPagePath, path }
}

exports.generatePostPages = (createPage, posts) => {
  const postTemplate = path.resolve('src/components/templates/Post/index.tsx')

  // Create Post pages
  posts.forEach((post) => {
    createPage({
      path: `${post.node.fields.slug}`,
      component: postTemplate,
      context: {
        slug: post.node.fields.slug,
        prev: post.previous && {
          title: post.previous.frontmatter.title,
          slug: post.previous.fields.slug
        },
        next: post.next && {
          title: post.next.frontmatter.title,
          slug: post.next.fields.slug
        }
      }
    })
  })

  // Create paginated Blog index pages
  const numPages = Math.ceil(posts.length / itemsPerPage)
  const slug = `/`

  Array.from({ length: numPages }).forEach((_, i) => {
    const { prevPagePath, nextPagePath, path } = getPaginationData(
      i,
      numPages,
      slug
    )

    createPage({
      path,
      component: postsTemplate,
      context: {
        slug,
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPageNumber: i + 1,
        prevPagePath,
        nextPagePath
      }
    })
  })
}

exports.generateTagPages = (createPage, tags) => {
  tags.forEach(({ tag, totalCount }) => {
    // Create paginated tag pages
    const numPages = Math.ceil(totalCount / itemsPerPage)
    const slug = `/tags/${tag}/`

    Array.from({ length: numPages }).forEach((_, i) => {
      const { prevPagePath, nextPagePath, path } = getPaginationData(
        i,
        numPages,
        slug
      )

      createPage({
        path,
        component: postsTemplate,
        context: {
          tag,
          slug,
          limit: itemsPerPage,
          skip: i * itemsPerPage,
          numPages,
          currentPageNumber: i + 1,
          prevPagePath,
          nextPagePath
        }
      })
    })
  })
}

exports.generateRedirectPages = (createRedirect) => {
  redirects.forEach(({ f, t }) => {
    createRedirect({
      fromPath: f,
      redirectInBrowser: true,
      toPath: t
    })
  })
}
