import { describe, expect, it } from 'vitest'
import type { BlogPost } from '../types'
import { sortPosts } from './sort-posts'

describe('sortPosts', () => {
  it('should sort posts by date, newest first', () => {
    const posts = sortPosts([
      { data: { date: new Date('2021-01-01') } } as BlogPost,
      { data: { date: new Date('2021-01-02') } } as BlogPost
    ])
    expect(posts).toEqual([
      { data: { date: new Date('2021-01-02') } },
      { data: { date: new Date('2021-01-01') } }
    ])
  })
})
