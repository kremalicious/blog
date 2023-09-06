import Web3Donation from '@components/Donation/Web3Donation'
import config from '@config/blog.config.mjs'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig, chains, theme } from '@lib/rainbowkit'

export default function Web3() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={theme}>
        <Web3Donation address={config.author.ether} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
