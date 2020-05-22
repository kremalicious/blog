import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import * as connectors from './connectors'
import { getLibrary, getNetworkName, getErrorMessage } from './utils'

export { connectors, getLibrary, getNetworkName, getErrorMessage }

export function useEagerConnect(): boolean {
  const { MetaMask } = connectors
  const { activate, active } = useWeb3React()
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

export function useInactiveListener(suppress = false): void {
  const { active, error, activate } = useWeb3React()
  const { MetaMask } = connectors

  useEffect((): any => {
    const { ethereum } = window as any
    if (ethereum && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(MetaMask)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(MetaMask)
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(MetaMask)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(MetaMask)
        }
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('networkChanged', handleNetworkChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        ethereum.removeListener('networkChanged', handleNetworkChanged)
        ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [active, error, suppress, activate])
}

export default function useWeb3(): Web3ReactContextInterface {
  const context = useWeb3React()

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()

  useEffect(() => {
    if (activatingConnector && activatingConnector === context.connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, context.connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  return context
}
