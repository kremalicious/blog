import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Search from '.'
import { useStaticQuery } from 'gatsby'

describe('Search', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => {
      return {
        allMarkdownRemark: {
          edges: [
            {
              node: {
                id: 'ddd',
                frontmatter: {
                  title: 'Hello',
                  image: {
                    childImageSharp: 'hello'
                  }
                },
                fields: {
                  slug: '/hello/'
                }
              }
            }
          ]
        }
      }
    })

    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'document')
    document.body.appendChild(portalRoot)
  })

  it('can be opened', () => {
    const { getByTitle, getByPlaceholderText } = render(<Search lng="en" />)
    fireEvent.click(getByTitle('Search'))
    fireEvent.change(getByPlaceholderText('Search everything'), {
      target: { value: 'hello' }
    })
    fireEvent.click(getByTitle('Close search'))
  })
})
