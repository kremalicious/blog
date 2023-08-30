export function configureChains() {
  return { chains: [{}], provider: {} }
}

export const apiProvider = {
  infura: jest.fn(),
  alchemy: jest.fn(),
  fallback: jest.fn()
}

export function getDefaultWallets() {
  return { connectors: [{}] }
}
