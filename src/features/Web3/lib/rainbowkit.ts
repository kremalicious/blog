import { type Theme, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { arbitrum, base, mainnet, optimism, polygon, zora } from 'wagmi/chains'

const PUBLIC_WALLETCONNECT_ID = import.meta.env.PUBLIC_WALLETCONNECT_ID
const isProduction = import.meta.env.PROD

if (isProduction && !PUBLIC_WALLETCONNECT_ID) {
  throw new Error('Missing web3-related environment variables')
}

export const wagmiConfig = getDefaultConfig({
  appName: 'kremalicious.com',
  projectId: PUBLIC_WALLETCONNECT_ID,
  chains: [mainnet, polygon, base, optimism, arbitrum, zora]
})

export const theme: Theme = {
  colors: {
    accentColor: 'var(--brand-cyan)',
    accentColorForeground: '#161a1b',
    actionButtonBorder: 'var(--border-color)',
    actionButtonBorderMobile: 'var(--border-color)',
    actionButtonSecondaryBackground: 'var(--box-background-color)',
    closeButton: 'var(--text-color)',
    closeButtonBackground: 'var(--box-background-color)',
    connectButtonBackground: 'transparent',
    connectButtonBackgroundError: 'var(--alert-error)',
    connectButtonInnerBackground: 'var(--box-background-color)',
    connectButtonText: 'var(--text-color)',
    connectButtonTextError: '#161a1b',
    connectionIndicator: 'var(--alert-success)',
    error: 'var(--alert-error)',
    generalBorder: 'var(--border-color)',
    generalBorderDim: 'var(--border-color)',
    menuItemBackground: 'var(--border-color)',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: 'var(--body-background-color)',
    modalBorder: 'var(--border-color)',
    modalText: 'var(--text-color)',
    modalTextDim: 'var(--text-color-dimmed)',
    modalTextSecondary: 'var(--text-color-light)',
    profileAction: 'var(--body-background-color)',
    profileActionHover: 'var(--box-background-color)',
    profileForeground: 'var(--body-background-color)',
    selectedOptionBorder: 'var(--border-color)',
    standby: 'var(--text-color-light)',
    downloadBottomCardBackground: 'var(--body-background-color)',
    downloadTopCardBackground: 'var(--body-background-color)'
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
    connectButton: 'none',
    dialog: 'var(--box-shadow)',
    profileDetailsAction: 'none',
    selectedOption: 'none',
    selectedWallet: 'none',
    walletLogo: 'var(--box-shadow)'
  },
  blurs: {
    modalOverlay: 'initial'
  }
}
