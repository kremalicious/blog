import { slug as slugger } from 'github-slugger'
import type { PostFrontmatter } from '@content/_schemas'

export const slugifyStr = (str: string) => slugger(str)

const slugify = (post: PostFrontmatter) =>
  post.slug ? slugger(post.slug) : slugger(post.title)

export const slugifyAll = (arr: string[]) => arr.map((str) => slugifyStr(str))

export default slugify
