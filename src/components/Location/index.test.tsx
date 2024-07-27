import * as nanostores from '@nanostores/react'
import { render, screen } from '@testing-library/react'
import {
  type MockInstance,
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import Location from '.'

const mockData = {
  now: {
    country: 'USA',
    country_code: 'US',
    city: 'New York'
  },
  next: {
    country: 'Canada',
    country_code: 'CA',
    city: 'Toronto',
    date_start: '2023-10-05'
  }
}

describe('Location component', () => {
  let useStoreSpy: MockInstance

  beforeAll(() => {
    vi.mock('@nanostores/react')
    useStoreSpy = vi.spyOn(nanostores, 'useStore')
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders the location items correctly', () => {
    useStoreSpy.mockImplementationOnce(() => ({
      data: mockData,
      loading: false,
      error: null
    }))

    render(<Location />)

    expect(screen.getByLabelText('USA')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByLabelText('Canada')).toBeInTheDocument()
    expect(screen.getByText('Toronto')).toBeInTheDocument()
  })

  it('renders the loading indicator', () => {
    useStoreSpy.mockImplementationOnce(() => ({
      data: null,
      loading: true,
      error: null
    }))

    render(<Location />)

    expect(screen.getByText('...')).toBeInTheDocument()
  })

  it('renders empty when there is no data', () => {
    useStoreSpy.mockImplementationOnce(() => ({
      data: null,
      loading: false,
      error: null
    }))

    render(<Location />)

    expect(screen.queryByLabelText('Location')).toBeEmptyDOMElement()
  })

  it('renders nothing and logs error when error is encountered', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    useStoreSpy.mockImplementationOnce(() => ({
      data: null,
      loading: false,
      error: 'Error'
    }))

    render(<Location />)

    expect(screen.queryByLabelText('Location')).not.toBeInTheDocument()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to fetch location: Error'
    )

    // Restore the original console.error function after the test
    consoleErrorSpy.mockRestore()
  })
})
