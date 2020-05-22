import React, { ReactElement } from 'react'
import loadable from '@loadable/component'
import shortid from 'shortid'
import { Helmet } from 'react-helmet'
import { Web3ReactProvider } from '@web3-react/core'
import { Author } from '../@types/Site'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { getLibrary } from '../hooks/use-web3'
import Qr from '../components/atoms/Qr'
import Icon from '../components/atoms/Icon'
import styles from './thanks.module.scss'

const LazyWeb3Donation = loadable(() =>
  import('../components/molecules/Web3Donation')
)

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

export default function Thanks(): ReactElement {
  const { author } = useSiteMetadata()
  const coins = Object.keys(author).filter(
    (key) => key === 'bitcoin' || key === 'ether'
  )

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

        <div className={styles.web3}>
          <header>
            <h4>Web3 Wallet</h4>
            <p>Send Ether with MetaMask or Brave.</p>
          </header>

          <Web3ReactProvider getLibrary={getLibrary}>
            <LazyWeb3Donation
              fallback={<div className={styles.loading}>Loading...</div>}
              address={author.ether}
            />
          </Web3ReactProvider>
        </div>

        <div className={styles.coins}>
          <header>
            <h4>Any other wallets</h4>
            <p>Send Bitcoin or Ether from any wallet.</p>
          </header>

          {coins.map((address: string) => (
            <Coin key={shortid.generate()} address={address} author={author} />
          ))}
        </div>
      </article>
    </>
  )
}
