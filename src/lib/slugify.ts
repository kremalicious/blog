import slugify from 'slugify'
// import type { PostFrontmatter } from '@content/_schemas'

// const slugify = (post: PostFrontmatter) =>
//   post.slug ? slugger(post.slug) : slugger(post.title)

export const slugifyAll = (arr: string[]) => arr.map((str) => slugify(str))

export default slugify
