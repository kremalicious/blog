const React = require('react')
const gatsby = jest.requireActual('gatsby')

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      /* eslint-disable no-unused-vars */
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      ref,
      replace,
      to,
      /* eslint-enable no-unused-vars */
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
