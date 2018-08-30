import React, { PureComponent, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Hamburger from '../atoms/Hamburger'
import styles from './Menu.module.scss'

class Menu extends PureComponent {
  constructor() {
    super()

    this.state = {
      menuOpen: false
    }
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
          query={graphql`
            query {
              allMarkdownRemark(
                sort: { fields: [fields___date], order: DESC }
              ) {
                edges {
                  node {
                    frontmatter {
                      type
                    }
                  }
                }
              }
            }
          `}
          render={data => {
            const posts = data.allMarkdownRemark.edges
            const typeSet = new Set()

            posts.forEach(post => {
              if (post.node.frontmatter.type) {
                typeSet.add(post.node.frontmatter.type)
              }
            })

            const typeList = Array.from(typeSet)

            const Types = typeList.map(type => (
              <li key={type}>
                <Link onClick={this.toggleMenu} to={`/${type}s/`}>
                  {type}s
                </Link>
              </li>
            ))

            return (
              <Fragment>
                <Hamburger onClick={this.toggleMenu} />
                <ul className={styles.menu}>{Types}</ul>
              </Fragment>
            )
          }}
        />
      </Fragment>
    )
  }
}

export default Menu
