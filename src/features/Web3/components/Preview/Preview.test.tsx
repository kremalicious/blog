import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Preview } from './Preview'

describe('Preview component', () => {
  test('renders without crashing', () => {
    render(<Preview />)
    expect(screen.getByText('You are')).toBeInTheDocument()
  })
})
