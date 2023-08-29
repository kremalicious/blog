import { ReactElement } from 'react'
import styles from './Layout.module.css'
import Typekit from '../../core/Typekit'
import Footer from '../../organisms/Footer'
import Header from '../../organisms/Header'

export default function LayoutBase({
  children
}: {
  children: any
}): ReactElement {
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
