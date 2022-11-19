import React, { ReactElement, useEffect, useState } from 'react'
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

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('has-menu-open')
    } else {
      document.body.classList.remove('has-menu-open')
    }
  }, [menuOpen])

  const MenuItems = menu.map((item) => (
    <li key={item.title}>
      <Link onClick={toggleMenu} to={item.link}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <>
      <Hamburger onClick={toggleMenu} />
      <nav aria-label="Pages" className={styles.menu}>
        <ul>{MenuItems}</ul>
      </nav>
    </>
  )
}
