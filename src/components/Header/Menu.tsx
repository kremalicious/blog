import { ReactElement, useEffect, useState } from 'react'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import Hamburger from '../core/Hamburger'
import styles from './Menu.module.css'

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
      <a onClick={toggleMenu} href={item.link}>
        {item.title}
      </a>
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