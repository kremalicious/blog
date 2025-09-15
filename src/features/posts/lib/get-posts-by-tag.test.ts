import { describe, expect, it, vi } from 'vitest'

import { getPostsByTag } from './get-posts-by-tag'

describe('getPostsByTag', () => {
  vi.mock('./index', () => ({
    getAllPosts: vi
      .fn()
      .mockResolvedValue([
        { data: { tags: ['test'] } },
        { data: { tags: ['test2'] } }
      ])
  }))

  it('should get posts by tag', async () => {
    const posts = await getPostsByTag('test')
    expect(posts).toEqual([{ data: { tags: ['test'] } }])
  })
})
