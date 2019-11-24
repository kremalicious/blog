import '@testing-library/jest-dom/extend-expect'

import * as Gatsby from 'gatsby'
const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
import meta from '../jest/__fixtures__/meta.json'
import avatar from '../jest/__fixtures__/avatar.json'
import posts from '../jest/__fixtures__/posts.json'
import github from '../jest/__fixtures__/github.json'

beforeAll(() => {
  useStaticQuery.mockImplementation(() => ({
    ...meta,
    ...avatar,
    logo: { edges: [{ node: { relativePath: 'apple-touch-icon.png' } }] },
    ...posts,
    ...github
  }))
})
