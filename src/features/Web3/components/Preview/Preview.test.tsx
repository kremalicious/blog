import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Preview } from './Preview'

describe('Preview component', () => {
  test('renders without crashing', () => {
    render(<Preview />)
    expect(screen.getByText('You are')).toBeInTheDocument()
  })
})
