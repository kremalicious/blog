const path = require('path')
const { itemsPerPage } = require('../config')

const postTemplate = path.resolve('src/components/templates/Post/index.tsx')
const archiveTemplate = path.resolve('src/components/templates/Archive.tsx')
const photosTemplate = path.resolve('src/components/templates/Photos.tsx')

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

exports.generateArchivePages = (createPage, archiveLength) => {
  // Create paginated archive pages
  const numPagesArchive = Math.ceil(archiveLength / itemsPerPage)
  const slugArchive = `/archive/`

  Array.from({ length: numPagesArchive }).forEach((_, i) => {
    const { prevPagePath, nextPagePath, path } = getPaginationData(
      i,
      numPagesArchive,
      slugArchive
    )

    createPage({
      path,
      component: archiveTemplate,
      context: {
        slug: slugArchive,
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages: numPagesArchive,
        currentPageNumber: i + 1,
        prevPagePath,
        nextPagePath
      }
    })
  })
}

exports.generatePhotosPages = (createPage, photosLength) => {
  // Create paginated photos pages
  const numPagesPhotos = Math.ceil(photosLength / itemsPerPage)
  const slugPhotos = `/photos/`

  Array.from({ length: numPagesPhotos }).forEach((_, i) => {
    const { prevPagePath, nextPagePath, path } = getPaginationData(
      i,
      numPagesPhotos,
      slugPhotos
    )

    createPage({
      path,
      component: photosTemplate,
      context: {
        slug: slugPhotos,
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages: numPagesPhotos,
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
    const slug = `/archive/${tag}/`

    Array.from({ length: numPages }).forEach((_, i) => {
      const { prevPagePath, nextPagePath, path } = getPaginationData(
        i,
        numPages,
        slug
      )

      createPage({
        path,
        component: archiveTemplate,
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
