import React from 'react'
import { Link } from 'gatsby'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import Icon from '../atoms/Icon'
import Vcard from '../molecules/Vcard'
import * as styles from './Footer.module.css'

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
        <Link to="/thanks" className={styles.btc}>
          <Icon name="Bitcoin" />
          Say Thanks
        </Link>
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
