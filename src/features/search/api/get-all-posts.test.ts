import { describe, expect, it, vi } from 'vitest'
import { getAllPostsForSearch } from './get-all-posts'

describe('getAllPostsForSearch (api)', () => {
  it('should fetch and return all posts for search', async () => {
    const mockJson = vi
      .fn()
      .mockResolvedValue([
        { data: { title: 'Test' } },
        { data: { title: 'Test2' } }
      ])
    const mockFetch = vi.fn().mockResolvedValue({ json: mockJson })
    vi.stubGlobal('fetch', mockFetch as unknown as typeof fetch)

    const posts = await getAllPostsForSearch()

    expect(mockFetch).toHaveBeenCalledWith('/api/posts-search/', {
      headers: { 'Content-Type': 'application/json' }
    })
    expect(posts).toEqual([
      { data: { title: 'Test' } },
      { data: { title: 'Test2' } }
    ])

    vi.unstubAllGlobals()
  })
})
