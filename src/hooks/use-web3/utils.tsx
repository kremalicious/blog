import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError
} from '@web3-react/injected-connector'
import { Web3Provider, ExternalProvider } from '@ethersproject/providers'

export function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 10000
  return library
}

export function getNetworkName(netId: number): string {
  let networkName

  switch (netId) {
    case 1:
      networkName = 'Main'
      break
    case 2:
      networkName = 'Morden'
      break
    case 3:
      networkName = 'Ropsten'
      break
    case 4:
      networkName = 'Rinkeby'
      break
    case 42:
      networkName = 'Kovan'
      break
    default:
      networkName = 'Private'
  }

  return networkName
}

export function getErrorMessage(error: Error, chainId: number): string {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install <a href="https://metamask.io">MetaMask</a> or <a href="https://brave.com">Brave</a>.'
  } else if (error instanceof UnsupportedChainIdError) {
    const networkName = getNetworkName(chainId)
    return `Please connect to <strong>Main</strong> network. You are on <strong>${networkName}</strong> right now.`
  } else if (error instanceof UserRejectedRequestError) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}
