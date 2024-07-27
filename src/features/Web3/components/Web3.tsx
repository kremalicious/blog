import '../lib/polyfills'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { theme, wagmiConfig } from '../lib/rainbowkit'
import { Web3Form } from './Form'

const queryClient = new QueryClient()

export function Web3() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={theme}>
          <Web3Form />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
