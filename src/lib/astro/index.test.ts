import { test, expect, afterEach, beforeEach, vi } from 'vitest'
import { getPostsByTag, getAllTags } from '.'
import { sortPosts } from './sortPosts'
import * as indexModule from './index'

let getAllPostsSpy: any

beforeEach(() => {
  getAllPostsSpy = vi.spyOn(indexModule, 'getAllPosts')
})

afterEach(() => {
  getAllPostsSpy.mockRestore()
})

test('sortPosts sorts posts by date in descending order', () => {
  const posts = [
    { data: { date: '2022-01-01' } },
    { data: { date: '2022-01-03' } },
    { data: { date: '2022-01-02' } }
  ] as any

  getAllPostsSpy.mockImplementationOnce(() => Promise.resolve(posts))

  const sortedPosts = sortPosts(posts)
  expect(sortedPosts[0].data.date).toStrictEqual('2022-01-03')
  expect(sortedPosts[1].data.date).toStrictEqual('2022-01-02')
  expect(sortedPosts[2].data.date).toStrictEqual('2022-01-01')
})

test('sortPosts handles an empty array', () => {
  const posts = [] as any
  const sortedPosts = sortPosts(posts)
  expect(sortedPosts).toEqual([])
})

test('getPostsByTag filters posts by a given tag', async () => {
  const posts = [
    { data: { tags: ['tag1', 'tag2'] } },
    { data: { tags: ['tag2', 'tag3'] } },
    { data: { tags: ['tag1'] } }
  ] as any

  getAllPostsSpy.mockImplementationOnce(() => Promise.resolve(posts))
  const filteredPosts = await getPostsByTag('tag1')
  expect(filteredPosts.length).toBe(2)
})

test('getPostsByTag returns an empty array when no posts have the given tag', async () => {
  const posts = [
    { data: { tags: ['tag1', 'tag2'] } },
    { data: { tags: ['tag2', 'tag3'] } }
  ] as any

  getAllPostsSpy.mockImplementationOnce(() => Promise.resolve(posts))
  const filteredPosts = await getPostsByTag('tag4')
  expect(filteredPosts).toEqual([])
})

test('getAllTags returns all unique tags along with their counts', async () => {
  const posts = [
    { data: { tags: ['tag1', 'tag2'] } },
    { data: { tags: ['tag2', 'tag3'] } },
    { data: { tags: ['tag1'] } }
  ] as any

  getAllPostsSpy.mockImplementationOnce(() => Promise.resolve(posts))
  const allTags = await getAllTags()
  expect(allTags).toEqual([
    { name: 'tag1', count: 2 },
    { name: 'tag2', count: 2 },
    { name: 'tag3', count: 1 }
  ])
})
