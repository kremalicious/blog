import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'
import * as connectors from './connectors'
import { getLibrary, getNetworkName, getErrorMessage } from './utils'

function useEagerConnect(): boolean {
  const { MetaMask } = connectors
  const { activate, active } = useWeb3React<Web3Provider>()
  const [tried, setTried] = useState(false)

  useEffect(() => {
    MetaMask.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(MetaMask, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [])

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

// Helper hook around useWeb3React to push typings, and connect by default
export default function useWeb3(): Web3ReactContextInterface<Web3Provider> {
  const context = useWeb3React<Web3Provider>()

  useEagerConnect()

  return context
}

export { connectors, getLibrary, getNetworkName, getErrorMessage }
