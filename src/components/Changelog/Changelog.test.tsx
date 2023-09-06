import { render, screen } from '@testing-library/react'
import Changelog from './Changelog'

describe('Changelog', async () => {
  it('renders without crashing', async () => {
    render(<Changelog repo="gatsby-plugin-matomo" />)
    await screen.findByText('sourced from')
  })

  it('returns nothing when no match', async () => {
    render(<Changelog repo="nomatch" />)
    expect(await screen.findByText('sourced from')).toBeUndefined()
  })
})
