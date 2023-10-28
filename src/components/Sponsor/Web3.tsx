import Web3Donation from './Web3Donation'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig, chains, theme } from './Web3Donation/lib/rainbowkit'
import type { ReactElement } from 'react'

export default function Web3(): ReactElement {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={theme}>
        <Web3Donation />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
