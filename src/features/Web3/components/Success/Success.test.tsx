import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Success } from './Success'

describe('Success component', () => {
  test('renders without crashing', () => {
    render(<Success />)
    expect(screen.getByText(`You're amazing, thanks!`)).toBeInTheDocument()
  })
})
