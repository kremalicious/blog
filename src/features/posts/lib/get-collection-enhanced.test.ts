import { describe, expect, it, vi } from 'vitest'
import { getCollectionEnhanced } from './get-collection-enhanced'

function getMockCollections() {
  return [
    {
      collection: 'articles',
      data: { title: 'Test', image: { src: 'test.jpg' } },
      id: 'test'
    },
    {
      collection: 'photos',
      data: { title: 'Test Photo', image: { src: 'test.jpg' } },
      id: 'test-photo'
    },
    { collection: 'links', data: { title: 'Test Link' }, id: 'test-link' }
  ]
}

vi.mock('@/features/posts/lib', () => ({
  readImageMetadata: vi.fn().mockResolvedValue({ width: 100, height: 100 })
}))

vi.mock('./get-slug', () => ({
  getSlug: vi.fn().mockReturnValue('test')
}))

vi.mock('astro:content', () => ({
  getCollection: vi.fn().mockResolvedValue(getMockCollections())
}))

vi.mock('./sort-posts', () => ({
  sortPosts: vi.fn().mockReturnValue(getMockCollections())
}))

vi.mock('./read-image-metadata', () => ({
  readImageMetadata: vi.fn().mockResolvedValue({ width: 100, height: 100 })
}))

vi.mock('./get-slug', () => ({
  getSlug: vi.fn().mockReturnValue('test')
}))

describe('getCollectionEnhanced', () => {
  it('should return collection enhanced', () => {
    const collection = getCollectionEnhanced('articles')
    expect(collection).toBeDefined()
  })
})
