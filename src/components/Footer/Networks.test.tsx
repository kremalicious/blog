import React from 'react'
import { render } from '@testing-library/react'
import meta from '../../../.config/jest/__fixtures__/meta.json'
import Networks from './Networks'

const { author, rss, jsonfeed } = meta.site.siteMetadata
const { twitter, github } = author
const links = [twitter, github, rss, jsonfeed, 'hello']

describe('Networks', () => {
  it('renders correctly', () => {
    const { container } = render(<Networks links={links} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
