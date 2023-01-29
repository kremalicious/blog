import React, { ReactElement } from 'react'
import * as styles from './Layout.module.css'
import Typekit from './atoms/Typekit'
import Footer from './organisms/Footer'
import Header from './organisms/Header'

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
