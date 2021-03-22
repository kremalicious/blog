import React from 'react'
import { Link } from 'gatsby'
import Search from '../molecules/Search'
import Menu from '../molecules/Menu'
import ThemeSwitch from '../molecules/ThemeSwitch'
import { ReactComponent as Logo } from '../../images/logo.svg'
import { header, headerContent, title, logo, nav } from './Header.module.css'

export default function Header(): JSX.Element {
  return (
    <header role="banner" className={header}>
      <div className={headerContent}>
        <h1 className={title}>
          <Link to="/">
            <Logo className={logo} /> kremalicious
          </Link>
        </h1>

        <nav role="navigation" className={nav}>
          <ThemeSwitch />
          <Search />
          <Menu />
        </nav>
      </div>
    </header>
  )
}
