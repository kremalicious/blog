import React, { ReactElement } from 'react'
import { HeadProps } from 'gatsby'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import Copy from '../components/atoms/Copy'
import Meta, { HeadMetaProps } from '../components/atoms/HeadMeta'
import Icon from '../components/atoms/Icon'
import Web3Donation from '../components/molecules/Web3Donation'
import { chains, theme, wagmiConfig } from '../helpers/rainbowkit'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import * as styles from './thanks.module.css'

const meta: Partial<HeadMetaProps> = {
  title: `Say Thanks`
}

function Coin({ address, title }: { address: string; title: string }) {
  return (
    <div className={styles.coin}>
      <h4 className={styles.titleCoin}>{title}</h4>
      <pre className={styles.code}>
        <code>{address}</code>
        <Copy text={address} />
      </pre>
    </div>
  )
}

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
  const coins = Object.entries(author).filter(
    ([key]) => key === 'bitcoin' || key === 'ether'
  )

  return (
    <article className={styles.thanks}>
      <BackButton />
      <header>
        <h1 className={styles.title}>{meta.title}</h1>
      </header>

      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={theme}>
          <Web3Donation address={author.ether} />
        </RainbowKitProvider>
      </WagmiConfig>

      <div className={styles.coins}>
        <h3 className={styles.subTitle}>
          Send Bitcoin or ERC-20 tokens from any wallet.
        </h3>

        {coins.map(([key, value]: [key: string, value: string]) => (
          <Coin key={key} title={key} address={value} />
        ))}
      </div>
    </article>
  )
}

export function Head(props: HeadProps) {
  return (
    <Meta {...meta} slug={props.location.pathname}>
      <meta name="robots" content="noindex,nofollow" />
    </Meta>
  )
}
