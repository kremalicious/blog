import React from 'react'
import { render } from '@testing-library/react'
import Networks from './Networks'

import meta from '../../../jest/__fixtures__/meta.json'

const { author, rss, jsonfeed } = meta.site.siteMetadata
const { twitter, github } = author
const links = [twitter, github, rss, jsonfeed, 'hello']

describe('Networks', () => {
  it('renders correctly', () => {
    const { container } = render(<Networks links={links} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
