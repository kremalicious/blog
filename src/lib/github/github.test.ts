import { describe, expect, it, vi } from 'vitest'
import { getRepo } from '.'
import type { Repo } from './types'

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
        } as Repo
      }
    }
  }

  it('should fetch repo data', async () => {
    const mockFetch = async () => ({ json: async () => mockResponseData })
    const originalFetch = window.fetch

    // Silence console.log, console.info, and console.error
    const originalConsoleLog = console.log
    const originalConsoleInfo = console.info
    const originalConsoleError = console.error
    console.log = () => {}
    console.info = () => {}
    console.error = () => {}

    window.fetch = mockFetch as any

    const repoInfo = await getRepo('mockuser/mockrepo')

    expect(repoInfo).toEqual(mockResponseData.data.user.repository)

    // Restore the original fetch and console functions
    window.fetch = originalFetch
    console.log = originalConsoleLog
    console.info = originalConsoleInfo
    console.error = originalConsoleError
  })

  it('should handle errors', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    const originalFetch = window.fetch
    ;(window as any).fetch = async () => ({
      json: async () => ({ errors: ['Mock error message'] })
    })

    const repoInfo = await getRepo('mockuser/mockrepo')

    window.fetch = originalFetch

    expect(repoInfo).toBeUndefined()
    expect(consoleErrorMock).toHaveBeenCalled()
    expect(consoleErrorMock).toHaveBeenLastCalledWith(['Mock error message'])

    consoleErrorMock.mockReset()
  })
})
