import React, { PureComponent, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Hamburger from '../atoms/Hamburger'
import styles from './Menu.module.scss'

const query = graphql`
  query {
    allMenuYaml {
      edges {
        node {
          title
          link
        }
      }
    }
  }
`

export default class Menu extends PureComponent {
  state = {
    menuOpen: false
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }))
  }

  isMenuOpen = () => this.state.menuOpen === true

  render() {
    return (
      <Fragment>
        <Helmet>
          <body className={this.isMenuOpen() ? 'has-menu-open' : null} />
        </Helmet>
        <StaticQuery
          query={query}
          render={data => {
            const { edges } = data.allMenuYaml

            const MenuItems = edges.map(({ node }) => (
              <li key={node.title}>
                <Link onClick={this.toggleMenu} to={node.link}>
                  {node.title}
                </Link>
              </li>
            ))

            return (
              <Fragment>
                <Hamburger onClick={this.toggleMenu} />
                <ul className={styles.menu}>{MenuItems}</ul>
              </Fragment>
            )
          }}
        />
      </Fragment>
    )
  }
}
