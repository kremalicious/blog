import React, { ReactElement } from 'react'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet'
import { Author } from '../@types/Site'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import Qr from '../components/atoms/Qr'
import Icon from '../components/atoms/Icon'
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit'
import { chain, createClient, WagmiProvider } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import {
  thanks,
  title,
  web3,
  loading,
  coins as styleCoins,
  coin,
  buttonBack
} from './thanks.module.css'

const LazyWeb3Donation = loadable(
  () => import('../components/molecules/Web3Donation')
)

const Coin = ({ address, author }: { address: string; author: Author }) => (
  <div className={coin}>
    <Qr title={address} address={(author as any)[address]} />
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

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
)

const { connectors } = getDefaultWallets({
  appName: 'kremalicious.com',
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

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

        <div className={web3}>
          <header>
            <h2>With Web3 Wallet</h2>
            <p>Send Ether with MetaMask or Brave.</p>
          </header>

          <WagmiProvider client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <LazyWeb3Donation
                fallback={<div className={loading}>Loading...</div>}
                address={author.ether}
              />
            </RainbowKitProvider>
          </WagmiProvider>
        </div>

        <div className={styleCoins}>
          <header>
            <h2>With Any Other Wallet</h2>
            <p>Send Bitcoin or Ether from any wallet.</p>
          </header>

          {coins.map((address: string) => (
            <Coin key={address} address={address} author={author} />
          ))}
        </div>
      </article>
    </>
  )
}
