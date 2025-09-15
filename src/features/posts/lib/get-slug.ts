import path from 'node:path'

export function getSlug(filePath: string): string {
  const parsedPath = path.parse(filePath)
  let slug: string

  // construct slug as full path from either file or folder name,
  if (parsedPath.base === 'index.md') {
    slug = parsedPath.dir
  } else {
    slug = `${parsedPath.dir}/${parsedPath.name}`
  }

  // remove folder structure
  slug = slug.split('/')[1]

  // remove the date prefix
  slug = slug.substring(11)

  return slug
}
