import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import Hamburger from '../atoms/Hamburger'
import * as styles from './Menu.module.css'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

export default function Menu(): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false)
  const { menu } = useSiteMetadata()

  function toggleMenu(): void {
    setMenuOpen(!menuOpen)
  }

  const MenuItems = menu.map((item) => (
    <li key={item.title}>
      <Link onClick={toggleMenu} to={item.link}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <>
      <Helmet>
        <html className={menuOpen ? 'has-menu-open' : undefined} lang="en" />
      </Helmet>
      <Hamburger onClick={toggleMenu} />
      <nav className={styles.menu}>
        <ul>{MenuItems}</ul>
      </nav>
    </>
  )
}
