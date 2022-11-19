import React, { ReactElement } from 'react'
import Typekit from './atoms/Typekit'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import * as styles from './Layout.module.css'

export default function Layout({ children }: { children: any }): ReactElement {
  return (
    <>
      <Typekit />
      <Header />

      <main className={styles.document} id="document">
        <div className={styles.content}>{children}</div>
      </main>

      <Footer />
    </>
  )
}
