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
                      category
                    }
                  }
                }
              }
            }
          `}
          render={data => {
            const posts = data.allMarkdownRemark.edges
            const categorySet = new Set()

            posts.forEach(post => {
              if (post.node.frontmatter.category) {
                categorySet.add(post.node.frontmatter.category)
              }
            })

            const categoryList = Array.from(categorySet)

            const Categories = categoryList.map(category => (
              <li key={category}>
                <Link onClick={this.toggleMenu} to={`/${category}/`}>
                  {category}
                </Link>
              </li>
            ))

            return (
              <Fragment>
                <Hamburger onClick={this.toggleMenu} />
                <ul className={styles.menu}>{Categories}</ul>
              </Fragment>
            )
          }}
        />
      </Fragment>
    )
  }
}

export default Menu
