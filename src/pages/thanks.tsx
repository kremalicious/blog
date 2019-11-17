import React, { lazy, Suspense } from 'react'
import shortid from 'shortid'
import Helmet from 'react-helmet'
import { Author } from '../@types/Site'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import Qr from '../components/atoms/Qr'
import Icon from '../components/atoms/Icon'
import styles from './thanks.module.scss'

const Web3Donation = lazy(() => import('../components/molecules/Web3Donation'))

const Coin = ({ address, author }: { address: string; author: Author }) => (
  <div className={styles.coin}>
    <Qr title={address} address={(author as any)[address]} />
  </div>
)

const BackButton = () => (
  <button
    className={`link ${styles.buttonBack}`}
    onClick={() => window.history.back()}
  >
    <Icon name="ChevronLeft" /> Go Back
  </button>
)

export default function Thanks() {
  const { author } = useSiteMetadata()
  const coins = Object.keys(author).filter(
    key => key === 'bitcoin' || key === 'ether'
  )
  const isSSR = typeof window === 'undefined'

  return (
    <>
      <Helmet>
        <title>Say thanks</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <article className={styles.thanks}>
        <BackButton />
        <header>
          <h1 className={styles.title}>Say Thanks</h1>
        </header>
        {!isSSR && (
          <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
            <Web3Donation address={author.ether} />

            <div className={styles.coins}>
              <header>
                <h4>Any other wallets</h4>
                <p>Send Bitcoin or Ether from any wallet.</p>
              </header>

              {coins.map((address: string) => (
                <Coin
                  key={shortid.generate()}
                  address={address}
                  author={author}
                />
              ))}
            </div>
          </Suspense>
        )}
      </article>
    </>
  )
}
