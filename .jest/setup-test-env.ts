import * as Gatsby from 'gatsby'
import '@testing-library/jest-dom/extend-expect'
import avatar from './__fixtures__/avatar.json'
import github from './__fixtures__/github.json'
import meta from './__fixtures__/meta.json'
import posts from './__fixtures__/posts.json'
import './__mocks__/matchMedia'

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')

beforeAll(() => {
  useStaticQuery.mockImplementation(() => ({
    ...meta,
    ...avatar,
    logo: { edges: [{ node: { relativePath: 'apple-touch-icon.png' } }] },
    ...posts,
    ...github
  }))
})
