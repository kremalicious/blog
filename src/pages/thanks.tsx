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
  buttonBack,
  titleCoin,
  subTitle
} from './thanks.module.css'
import Web3Donation from '../components/molecules/Web3Donation'
import Copy from '../components/atoms/Copy'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { chains, theme, wagmiClient } from '../helpers/rainbowkit'

function Coin({ address, title }: { address: string; title: string }) {
  return (
    <div className={coin}>
      <h4 className={titleCoin}>{title}</h4>
      <pre className={code}>
        <code>{address}</code>
        <Copy text={address} />
      </pre>
    </div>
  )
}

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
  const coins = Object.entries(author).filter(
    ([key]) => key === 'bitcoin' || key === 'ether'
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
          <h3 className={subTitle}>
            Send Bitcoin or ERC-20 tokens from any wallet.
          </h3>

          {coins.map(([key, value]) => (
            <Coin key={key} title={key} address={value} />
          ))}
        </div>
      </article>
    </>
  )
}
