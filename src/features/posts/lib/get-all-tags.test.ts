import { describe, expect, it, vi } from 'vitest'
import { getAllTags } from './get-all-tags'

describe('getAllTags', () => {
  vi.mock('./index', () => ({
    getAllPosts: vi
      .fn()
      .mockResolvedValue([
        { data: { tags: ['test'] } },
        { data: { tags: ['test2'] } },
        { data: { tags: ['test'] } }
      ])
  }))

  it('should get all tags with count', async () => {
    const tags = await getAllTags()
    expect(tags).toEqual([
      { name: 'test', count: 2 },
      { name: 'test2', count: 1 }
    ])
  })
})
