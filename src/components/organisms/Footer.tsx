import React, { ReactElement, PureComponent } from 'react'
import { Link } from 'gatsby'
import Container from '../atoms/Container'
import Icon from '../atoms/Icon'
import Vcard from '../molecules/Vcard'
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import styles from './Footer.module.scss'

function Copyright() {
  const { name, uri, bitcoin, github } = useSiteMetadata().author
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
          <code>{bitcoin}</code>
        </Link>
      </p>
    </section>
  )
}

export default class Footer extends PureComponent {
  render(): ReactElement {
    return (
      <footer role="contentinfo" className={styles.footer}>
        <Container>
          <Vcard />

          <Copyright />
        </Container>
      </footer>
    )
  }
}
