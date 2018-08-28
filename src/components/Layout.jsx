import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Container from './atoms/Container'
import Head from './molecules/Head'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

const Layout = ({ children }) => (
  <Fragment>
    <Head />
    <Header />

    <main className={styles.document} id="document">
      <div className={styles.content}>
        <Container>{children}</Container>
      </div>
    </main>

    <Footer />
  </Fragment>
)

Layout.propTypes = {
  children: PropTypes.any.isRequired
}

export default Layout
