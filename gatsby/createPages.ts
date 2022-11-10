import path from 'path'
import config from '../config'
import { Actions } from 'gatsby'

const postTemplate = path.resolve('src/components/templates/Post/index.tsx')
const archiveTemplate = path.resolve('src/components/templates/Archive.tsx')
const photosTemplate = path.resolve('src/components/templates/Photos.tsx')

const redirects = [
  { f: '/feed', t: '/feed.xml' },
  { f: '/feed/', t: '/feed.xml' },
  { f: '/goodies/', t: '/archive/goodies/' }
]

function getPaginationData(i: number, numPages: number, slug: string) {
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

export const generatePostPages = (
  createPage: Actions['createPage'],
  posts: Queries.AllContentQuery['all']['edges'] | undefined
) => {
  // Create Post pages
  posts?.forEach((post) => {
    createPage({
      path: `${post.node.fields?.slug}`,
      component: postTemplate,
      context: {
        slug: post.node.fields?.slug,
        prev: post.previous && {
          title: post.previous.frontmatter?.title,
          slug: post.previous.fields?.slug
        },
        next: post.next && {
          title: post.next.frontmatter?.title,
          slug: post.next.fields?.slug
        }
      }
    })
  })
}

function generateIndexPages(
  createPage: Actions['createPage'],
  length: number,
  slug: string,
  template: string,
  tag?: string
) {
  const numPages = Math.ceil(length / config.itemsPerPage)

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
        limit: config.itemsPerPage,
        skip: i * config.itemsPerPage,
        numPages: numPages,
        currentPageNumber: i + 1,
        prevPagePath,
        nextPagePath,
        ...(tag && { tag })
      }
    })
  })
}

// Create paginated archive pages
export const generateArchivePages = (
  createPage: Actions['createPage'],
  archiveLength: number | undefined
) => {
  if (!archiveLength) return
  generateIndexPages(createPage, archiveLength, `/archive/`, archiveTemplate)
}

// Create paginated photos pages
export const generatePhotosPages = (
  createPage: Actions['createPage'],
  photosLength: number | undefined
) => {
  if (!photosLength) return
  generateIndexPages(createPage, photosLength, `/photos/`, photosTemplate)
}

// Create paginated tag pages
export const generateTagPages = (
  createPage: Actions['createPage'],
  tags: Queries.AllContentQuery['tags']['group'] | undefined
) => {
  if (!tags) return

  tags.forEach(({ tag, totalCount }) => {
    generateIndexPages(
      createPage,
      totalCount,
      `/archive/${tag}/`,
      archiveTemplate,
      tag || ''
    )
  })
}

export const generateRedirectPages = (
  createRedirect: Actions['createRedirect']
) => {
  redirects.forEach(({ f, t }) => {
    createRedirect({
      fromPath: f,
      redirectInBrowser: true,
      toPath: t
    })
  })
}
