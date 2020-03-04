import React from 'react'
import styles from './Ad.module.scss'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

interface WindowWithMatomo extends Window {
  _paq?: any
}

export default function Ad() {
  const { ad } = useSiteMetadata()

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    const { _paq } = window as WindowWithMatomo
    _paq && _paq.push(['trackEvent', 'Ad Interaction', 'click'])

    window.open(ad.link)
  }

  return (
    <a
      className={styles.ad}
      href={ad.link}
      onClick={(e: React.MouseEvent) => handleClick(e)}
    >
      {ad.title}
    </a>
  )
}
