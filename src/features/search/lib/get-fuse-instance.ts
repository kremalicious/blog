import Fuse from 'fuse.js'
import type { SearchResultItem } from '../types'

// Configure fuse.js
// https://fusejs.io/api/options.html
const fuseOptions = {
  keys: [
    'data.tags',
    'data.title',
    'data.leadRaw',
    'data.imageMetadata.iptc.title',
    'data.imageMetadata.iptc.caption'
  ],
  minMatchCharLength: 2,
  threshold: 0.3,
  findAllMatches: true,
  ignoreLocation: true
}

let fuse: Fuse<SearchResultItem> | null = null

export function getFuseInstance(items: SearchResultItem[]) {
  if (fuse) return fuse
  fuse = new Fuse(items, fuseOptions)
  return fuse
}
