import { getDefaultWallets, Theme } from '@rainbow-me/rainbowkit'
import { createClient, configureChains } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [infuraProvider({ apiKey: process.env.GATSBY_INFURA_ID }), publicProvider()]
)

export const { connectors } = getDefaultWallets({
  appName: 'kremalicious.com',
  chains
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
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
