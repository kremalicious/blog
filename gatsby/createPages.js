const path = require('path')
const { itemsPerPage } = require('../config')

const postTemplate = path.resolve('src/components/templates/Post/index.tsx')
const archiveTemplate = path.resolve('src/components/templates/Archive.tsx')
const photosTemplate = path.resolve('src/components/templates/Photos.tsx')

const redirects = [
  { f: '/feed', t: '/feed.xml' },
  { f: '/feed/', t: '/feed.xml' },
  { f: '/goodies/', t: '/archive/goodies/' }
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
}

function generateIndexPages(createPage, length, slug, template) {
  const numPages = Math.ceil(length / itemsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    const { prevPagePath, nextPagePath, path } = getPaginationData(
      i,
      numPages,
      slug
    )

    createPage({
      path,
      component: template,
      context: {
        slug,
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages: numPages,
        currentPageNumber: i + 1,
        prevPagePath,
        nextPagePath
      }
    })
  })
}

// Create paginated archive pages
exports.generateArchivePages = (createPage, archiveLength) => {
  generateIndexPages(createPage, archiveLength, `/archive/`, archiveTemplate)
}

// Create paginated photos pages
exports.generatePhotosPages = (createPage, photosLength) => {
  generateIndexPages(createPage, photosLength, `/photos/`, photosTemplate)
}

// Create paginated tag pages
exports.generateTagPages = (createPage, tags) => {
  tags.forEach(({ tag, totalCount }) => {
    generateIndexPages(
      createPage,
      totalCount,
      `/archive/${tag}/`,
      archiveTemplate
    )
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
