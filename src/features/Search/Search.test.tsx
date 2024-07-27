import { isSearchOpen } from '@stores/search'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import {
  type MockInstance,
  afterEach,
  beforeEach,
  expect,
  test,
  vi
} from 'vitest'
import Search from './Search'

let portalRoot: HTMLDivElement
let unsubscribe: () => void
let fetchSpy: MockInstance<
  [input: string | Request | URL, init?: RequestInit | undefined],
  Promise<Response>
>
let originalFetch: GlobalFetch['fetch']
let storeState = false

beforeEach(() => {
  portalRoot = global.document.createElement('div')
  portalRoot.setAttribute('id', 'document')
  global.document.body.appendChild(portalRoot)

  // Track the store's state
  unsubscribe = isSearchOpen.subscribe((value) => {
    storeState = value
  })

  // Mock fetch API
  originalFetch = globalThis.fetch
  globalThis.fetch = async () => {
    return {
      json: () =>
        Promise.resolve([{ data: { title: 'Test Post' }, slug: 'test-post' }])
    } as Response
  }

  fetchSpy = vi.spyOn(globalThis, 'fetch')
})

afterEach(() => {
  portalRoot.remove()
  unsubscribe()
  ;(globalThis.fetch as GlobalFetch['fetch']) = originalFetch
})

test('Search component', async () => {
  render(<Search />)

  act(() => {
    // Simulate opening the search
    isSearchOpen.set(true)
  })

  // Wait for the fetch to complete
  await waitFor(() => {
    expect(fetchSpy).toHaveBeenCalled()
  })

  // Check if the search input appears
  const searchInput = screen.getByPlaceholderText('Search everything')
  expect(searchInput).toBeInTheDocument()

  fireEvent.change(searchInput, { target: { value: 'Test' } })
  expect(searchInput).toHaveValue('Test')
  expect(screen.getByText('Test Post')).toBeInTheDocument()

  const closeButton = screen.getByTitle('Close search')
  fireEvent.click(closeButton)

  // Check if the search is closed
  await waitFor(() => expect(storeState).toBe(false))
})
