import React from 'react'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import Icon from '../core/Icon'
import Vcard from './Vcard'
import styles from './index.module.css'

function Copyright() {
  const { name, uri, github } = useSiteMetadata().author
  const year = new Date().getFullYear()

  return (
    <section className={styles.copyright}>
      <p>
        &copy; 2005&ndash;
        {year + ' '}
        <a href={uri} rel="me">
          {name}
        </a>
        <a href={`${github}/blog`}>
          <Icon name="GitHub" />
          View source
        </a>
        <a href="/thanks" className={styles.btc}>
          <Icon name="Bitcoin" />
          Say Thanks
        </a>
      </p>
    </section>
  )
}

export default function Footer(): JSX.Element {
  return (
    <footer role="contentinfo" className={styles.footer}>
      <Vcard />
      <Copyright />
    </footer>
  )
}
