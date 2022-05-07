import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import Icon from '../components/atoms/Icon'
import {
  thanks,
  title,
  coins as styleCoins,
  coin,
  code,
  buttonBack
} from './thanks.module.css'
import Web3Donation from '../components/molecules/Web3Donation'
import Copy from '../components/atoms/Copy'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { chains, theme, wagmiClient } from '../helpers/rainbowkit'

const Coin = ({ address }: { address: string }) => (
  <div className={coin}>
    <pre className={code}>
      <code>{address}</code>
      <Copy text={address} />
    </pre>
  </div>
)

const BackButton = () => (
  <button
    className={`link ${buttonBack}`}
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

      <article className={thanks}>
        <BackButton />
        <header>
          <h1 className={title}>Say Thanks</h1>
        </header>

        <WagmiProvider client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={theme}>
            <Web3Donation address={author.ether} />
          </RainbowKitProvider>
        </WagmiProvider>

        <div className={styleCoins}>
          <header>
            <h2>With Any Other Wallet</h2>
            <p>Send Bitcoin or Ether from any wallet.</p>
          </header>

          {coins.map((address: string) => (
            <Coin key={address} address={address} />
          ))}
        </div>
      </article>
    </>
  )
}
