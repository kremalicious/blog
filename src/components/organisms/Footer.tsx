import React from 'react'
import { Link } from 'gatsby'
import Icon from '../atoms/Icon'
import Vcard from '../molecules/Vcard'
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import { copyright, btc, footer } from './Footer.module.css'

function Copyright() {
  const { name, uri, github } = useSiteMetadata().author
  const year = new Date().getFullYear()

  return (
    <section className={copyright}>
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
        <Link to="/thanks" className={btc}>
          <Icon name="Bitcoin" />
          Say Thanks
        </Link>
      </p>
    </section>
  )
}

export default function Footer(): JSX.Element {
  return (
    <footer role="contentinfo" className={footer}>
      <Vcard />
      <Copyright />
    </footer>
  )
}
