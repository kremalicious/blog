import React, { useState } from 'react'
import Container from '../atoms/Container'
import Icon from '../atoms/Icon'
import Vcard from '../molecules/Vcard'
import ThemeSwitch from '../molecules/ThemeSwitch'
import ModalThanks from './ModalThanks'

import styles from './Footer.module.scss'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

function Copyright({
  toggleModal,
  showModal
}: {
  toggleModal(): void
  showModal: boolean
}) {
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
        <button className={styles.btc} onClick={toggleModal}>
          <Icon name="Bitcoin" />
          <code>{bitcoin}</code>
        </button>
      </p>

      {showModal && (
        <ModalThanks isOpen={showModal} handleCloseModal={toggleModal} />
      )}
    </section>
  )
}

export default function Footer() {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <footer role="contentinfo" className={styles.footer}>
      <Container>
        <ThemeSwitch />
        <Vcard />

        <Copyright showModal={showModal} toggleModal={toggleModal} />
      </Container>
    </footer>
  )
}
