import { type Theme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

const PUBLIC_INFURA_ID = import.meta.env.PUBLIC_INFURA_ID
const PUBLIC_WALLETCONNECT_ID = import.meta.env.PUBLIC_WALLETCONNECT_ID
const isProduction = import.meta.env.PROD

if (isProduction && (!PUBLIC_INFURA_ID || !PUBLIC_WALLETCONNECT_ID)) {
  throw new Error('Missing web3-related environment variables')
}

export const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [infuraProvider({ apiKey: PUBLIC_INFURA_ID }), publicProvider()]
)

export const { connectors } = getDefaultWallets({
  appName: 'kremalicious.com',
  projectId: PUBLIC_WALLETCONNECT_ID,
  chains
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export const theme = {
  colors: {
    accentColor: 'var(--brand-cyan)',
    accentColorForeground: '#161a1b',
    actionButtonBorder: 'var(--body-background-color)',
    actionButtonBorderMobile: 'var(--body-background-color)',
    actionButtonSecondaryBackground: 'var(--box-background-color)',
    closeButton: 'var(--text-color)',
    closeButtonBackground: 'var(--box-background-color)',
    connectButtonBackground: 'var(--body-background-color)',
    connectButtonBackgroundError: 'var(--alert-error)',
    connectButtonInnerBackground: 'var(--box-background-color)',
    connectButtonText: 'var(--text-color)',
    connectButtonTextError: '#161a1b',
    connectionIndicator: 'var(--alert-success)',
    error: 'var(--alert-error)',
    generalBorder: 'var(--border-color)',
    generalBorderDim: 'var(--border-color)',
    menuItemBackground: 'var(--link-color)',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: 'var(--body-background-color)',
    modalBorder: 'var(--body-background-color)',
    modalText: 'var(--text-color)',
    modalTextDim: 'var(--text-color-dimmed)',
    modalTextSecondary: 'var(--text-color-light)',
    profileAction: 'var(--body-background-color)',
    profileActionHover: 'var(--box-background-color)',
    profileForeground: 'var(--body-background-color)',
    selectedOptionBorder: 'var(--border-color)',
    standby: 'var(--text-color-dimmed)'
  },
  fonts: {
    body: 'var(--font-family-base)'
  },
  radii: {
    actionButton: 'var(--border-radius)',
    connectButton: 'var(--border-radius)',
    menuButton: 'var(--border-radius)',
    modal: 'var(--border-radius)',
    modalMobile: 'var(--border-radius)'
  },
  shadows: {
    connectButton: 'var(--box-shadow)',
    dialog: 'var(--box-shadow)',
    profileDetailsAction: 'none',
    selectedOption: 'var(--box-shadow)',
    selectedWallet: 'var(--box-shadow)',
    walletLogo: 'var(--box-shadow)'
  }
} as Theme
