import React from 'react'
import testRender from '../../../jest/testRender'

import { PureChangelog as Changelog } from './Changelog'

const data = {
  github: {
    viewer: {
      repositories: {
        edges: [
          {
            node: {
              name: 'gatsby-plugin-matomo',
              url: 'https://hello.com',
              owner: { login: 'kremalicious' },
              object: {
                text: 'hello'
              }
            }
          }
        ]
      }
    }
  }
}

describe('Changelog', () => {
  testRender(<Changelog repo="gatsby-plugin-matomo" data={data} />)
})
