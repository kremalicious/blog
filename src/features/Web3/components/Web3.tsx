import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig, chains, theme } from '../lib/rainbowkit'
import Web3Form from './Form'

export function Web3() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={theme}>
        <Web3Form />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
