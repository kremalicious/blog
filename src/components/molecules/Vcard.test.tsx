import React from 'react'
import { render } from '@testing-library/react'

import { VcardPure as Vcard } from './Vcard'
import avatar from '../../../jest/__fixtures__/avatar.json'

const links = [
  'twitter.com',
  'github.com',
  'facebook.com',
  'feed.xml',
  'feed.json',
  'whatever'
]

describe('Vcard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Vcard
        avatar={avatar.edges[0].node.childImageSharp.fixed}
        name="Hello You"
        uri="https://demo.com"
        links={links}
      />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
