import { vi } from 'vitest'

export function configureChains() {
  return { chains: [{}], provider: {} }
}

export const apiProvider = {
  infura: vi.fn(),
  alchemy: vi.fn(),
  fallback: vi.fn()
}

export function getDefaultWallets() {
  return { connectors: [{}] }
}

export function ConnectButton() {
  return 'Connect Wallet'
}
