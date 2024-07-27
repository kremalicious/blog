import mockArticles from '@test/__fixtures__/getCollectionArticles.json'
import mockLinks from '@test/__fixtures__/getCollectionLinks.json'
import mockPhotos from '@test/__fixtures__/getCollectionPhotos.json'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { getAllPosts } from './getAllPosts'
import * as loadAndFormatCollectionModule from './loadAndFormatCollection'

let loadAndFormatCollectionSpy: any

beforeEach(() => {
  loadAndFormatCollectionSpy = vi.spyOn(
    loadAndFormatCollectionModule,
    'loadAndFormatCollection'
  )
})

afterEach(() => {
  loadAndFormatCollectionSpy.mockRestore()
})

describe('getAllPosts', () => {
  test('combines and sorts all posts', async () => {
    loadAndFormatCollectionSpy.mockImplementation(
      async (collectionName: string) => {
        switch (collectionName) {
          case 'articles':
            return mockArticles
          case 'links':
            return mockLinks
          case 'photos':
            return mockPhotos
          default:
            return []
        }
      }
    )

    const result = await getAllPosts()

    expect(result).toBeDefined()
    expect(result.length).toBe(
      mockArticles.length + mockLinks.length + mockPhotos.length
    )
  })
})
