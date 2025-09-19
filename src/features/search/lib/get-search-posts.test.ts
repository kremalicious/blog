import { describe, expect, it, vi } from 'vitest'

vi.mock('@/features/posts/lib', () => ({
  getAllPosts: vi.fn().mockResolvedValue([
    {
      collection: 'articles',
      data: {
        slug: 'a',
        title: 'Test',
        tags: ['x'],
        lead: 'lead',
        date: new Date('2020-01-01'),
        updated: new Date('2020-01-02'),
        image: '/img/a.jpg'
      },
      body: 'Lorem ipsum dolor sit amet sit amet',
      id: 'a'
    },
    {
      collection: 'links',
      data: {
        slug: 'b',
        title: 'Test2',
        tags: ['y'],
        lead: 'lead2',
        date: new Date('2020-02-01'),
        updated: new Date('2020-02-02')
      },
      body: 'Dolor sit amet',
      id: 'b'
    }
  ])
}))

import { getAllPostsForSearch } from './get-search-posts'

describe('getAllPostsForSearch (lib)', () => {
  it('should map and trim posts, keeping image for articles/photos only', async () => {
    const posts = await getAllPostsForSearch()
    expect(posts).toEqual([
      {
        collection: 'articles',
        data: {
          slug: 'a',
          title: 'Test',
          tags: ['x'],
          lead: 'Lorem ipsum dolor sit amet sit amet'.substring(0, 200),
          date: new Date('2020-01-01'),
          updated: new Date('2020-01-02'),
          image: '/img/a.jpg'
        }
      },
      {
        collection: 'links',
        data: {
          slug: 'b',
          title: 'Test2',
          tags: ['y'],
          lead: 'Dolor sit amet'.substring(0, 200),
          date: new Date('2020-02-01'),
          updated: new Date('2020-02-02'),
          image: undefined
        }
      }
    ])
  })
})
