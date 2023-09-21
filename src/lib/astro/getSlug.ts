import type { CollectionEntry } from 'astro:content'
import path from 'node:path'

export function getSlug(filePath: string) {
  const parsedPath = path.parse(filePath)
  let slug

  // construct slug as full path from either file or folder name,
  if (parsedPath.base === 'index.md') {
    slug = `${parsedPath.dir}`
  } else {
    slug = `${parsedPath.dir}/${parsedPath.name}`
  }

  // remove folder structure
  slug = slug.split('/')[1]

  // remove the date prefix
  slug = slug.substring(11)

  return slug as CollectionEntry<'articles' | 'photos' | 'links'>['slug']
}
