import React from 'react'
import testRender from '../../../jest/testRender'

import { PureChangelog as Changelog } from './Changelog'
import { GitHubRepo } from '../../@types/GitHub'

const repos: [{ node: GitHubRepo }] = [
  {
    node: {
      name: 'gatsby-plugin-matomo',
      url: 'https://hello.com',
      owner: { login: 'kremalicious' },
      object: {
        id: 'hello',
        text: 'hello'
      }
    }
  }
]

describe('Changelog', () => {
  testRender(<Changelog repo="gatsby-plugin-matomo" repos={repos} />)
})
