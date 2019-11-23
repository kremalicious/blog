import { useState, useEffect } from 'react'
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError
} from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 10000
  return library
}

export function getNetworkName(netId: number) {
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

export function getErrorMessage(error: Error, chainId: number) {
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

export function getBalance(account: string, library: any) {
  const [ethBalance, setEthBalance] = useState()

  useEffect((): any => {
    if (library && account) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setEthBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null)
          }
        })

      return () => {
        stale = true
        setEthBalance(undefined)
      }
    }
  }, [library, account])

  return ethBalance
}
