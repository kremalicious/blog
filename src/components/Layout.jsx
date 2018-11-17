import React from 'react'
import PropTypes from 'prop-types'
import Container from './atoms/Container'
import Typekit from './atoms/Typekit'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

const Layout = ({ children }) => (
  <>
    <Typekit />
    <Header />

    <main className={styles.document} id="document">
      <div className={styles.content}>
        <Container>{children}</Container>
      </div>
    </main>

    <Footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.any.isRequired
}

export default Layout
