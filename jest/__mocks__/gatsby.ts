import React from 'react'
const gatsby = jest.requireActual('gatsby')

export default {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      /* eslint-disable @typescript-eslint/no-unused-vars */
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      ref,
      replace,
      to,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...rest
    }) =>
      React.createElement('a', {
        ...rest,
        href: to
      })
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn()
}
