import React, { ReactElement } from 'react'
import Container from './atoms/Container'
import Typekit from './atoms/Typekit'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line
//   const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js')
//   whyDidYouRender(React)
// }

export default function Layout({
  children
}: {
  location?: Location
  children: any
}): ReactElement {
  return (
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
}
