import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Success } from './Success'

describe('Success component', () => {
  test('renders without crashing', () => {
    render(<Success />)
    expect(screen.getByText(`You're amazing, thanks!`)).toBeInTheDocument()
  })
})
