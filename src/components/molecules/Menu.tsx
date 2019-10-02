import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Hamburger from '../atoms/Hamburger'
import styles from './Menu.module.scss'

const query = graphql`
  query {
    site {
      siteMetadata {
        menu {
          title
          link
        }
      }
    }
  }
`

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = useStaticQuery(query)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const { menu } = data.site.siteMetadata

  const MenuItems = menu.map((item: any) => (
    <li key={item.title}>
      <Link onClick={toggleMenu} to={item.link}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <>
      <Helmet>
        <body className={menuOpen ? 'has-menu-open' : null} />
      </Helmet>
      <Hamburger onClick={toggleMenu} />
      <ul className={styles.menu}>{MenuItems}</ul>
    </>
  )
}
