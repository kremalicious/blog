import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import Hamburger from '../atoms/Hamburger'
import { menu as styleMenu } from './Menu.module.css'
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import { MenuItem } from '../../@types/Site'

export default function Menu(): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false)
  const { menu } = useSiteMetadata()

  function toggleMenu(): void {
    setMenuOpen(!menuOpen)
  }

  const MenuItems = menu.map(
    (item: MenuItem): JSX.Element => (
      <li key={item.title}>
        <Link onClick={toggleMenu} to={item.link}>
          {item.title}
        </Link>
      </li>
    )
  )

  return (
    <>
      <Helmet>
        <html className={menuOpen ? 'has-menu-open' : undefined} lang="en" />
      </Helmet>
      <Hamburger onClick={toggleMenu} />
      <nav className={styleMenu}>
        <ul>{MenuItems}</ul>
      </nav>
    </>
  )
}
