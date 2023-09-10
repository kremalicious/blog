import { it, describe, expect, vi } from 'vitest'
import { getRepo, CHANGELOG_QUERY } from './github'

describe('getRepo Function', () => {
  const mockResponseData = {
    data: {
      user: {
        repository: {
          name: 'MockRepo',
          description: 'Mock description',
          forkCount: 42,
          stargazerCount: 100,
          url: 'https://github.com/mockuser/mockrepo',
          owner: {
            login: 'mockuser'
          },
          object: {
            id: 'mockObjectID',
            text: 'Mock changelog content'
          }
        }
      }
    }
  }

  const mockFetch = async () => {
    return {
      json: async () => mockResponseData
    }
  }

  it('should fetch repo data', async () => {
    // Mock the fetch function to return the expected data
    const originalFetch = window.fetch
    window.fetch = mockFetch as any

    const repoInfo = await getRepo('mockuser/mockrepo')

    // Restore the original fetch function
    window.fetch = originalFetch

    expect(repoInfo).toEqual(mockResponseData.data.user.repository)
  })

  it('should handle errors', async () => {
    // Spy on console.error to capture any calls
    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    const originalFetch = window.fetch

    ;(window as any).fetch = async () => ({
      json: async () => ({
        errors: ['Mock error message']
      })
    })

    const repoInfo = await getRepo('mockuser/mockrepo')

    window.fetch = originalFetch

    expect(repoInfo).toBeUndefined()
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock).toHaveBeenLastCalledWith(['Mock error message'])

    consoleMock.mockReset()
  })
})
