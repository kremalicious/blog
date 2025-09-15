import { describe, expect, it, vi } from 'vitest'

import { getSlug } from './get-slug'

describe('getSlug', () => {
  vi.mock('node:path', () => {
    return {
      default: {
        parse: (filePath: string) => {
          if (filePath.includes('index.md')) {
            return {
              root: '',
              dir: 'foo/2021-01-01-post-1',
              base: 'index.md',
              ext: '.md',
              name: 'index'
            }
          }
          return {
            root: '',
            dir: 'foo',
            base: '2021-01-01-post-1.md',
            ext: '.md',
            name: '2021-01-01-post-1'
          }
        }
      }
    }
  })

  it('should get the slug from the file path', () => {
    const slug = getSlug('content/articles/2021-01-01-post-1.md')
    expect(slug).toBe('post-1')
  })

  it('should get the slug from the folder path', () => {
    const slug = getSlug('content/articles/2021-01-01/index.md')
    expect(slug).toBe('post-1')
  })
})
