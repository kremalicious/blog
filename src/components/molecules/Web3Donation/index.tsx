import React, { ReactElement, useState } from 'react'
import { parseEther } from '@ethersproject/units'
import InputGroup from './InputGroup'
import Alert, { getTransactionMessage } from './Alert'
import { web3 as styleWeb3 } from './index.module.css'
import Account from './Account'
import { useSigner } from 'wagmi'

// function getErrorMessage(error: Error, chainId: number): string {
//   if (error instanceof NoEthereumProviderError) {
//     return 'No Ethereum browser extension detected, install <a href="https://metamask.io">MetaMask</a> or <a href="https://brave.com">Brave</a>.'
//   } else if (error instanceof UnsupportedChainIdError) {
//     const networkName = getNetworkName(chainId)
//     return `Please connect to <strong>Main</strong> network. You are on <strong>${networkName}</strong> right now.`
//   } else if (error instanceof UserRejectedRequestError) {
//     return 'Please authorize this website to access your Ethereum account.'
//   } else {
//     console.error(error)
//     return 'An unknown error occurred. Check the console for more details.'
//   }
// }

export default function Web3Donation({
  address
}: {
  address: string
}): ReactElement {
  const { data: signer, isError, isLoading } = useSigner()

  const [message, setMessage] = useState<{ status: string; text: string }>()
  const [transactionHash, setTransactionHash] = useState<string>()

  async function sendTransaction(amount: string) {
    setMessage({
      status: 'loading',
      text: getTransactionMessage().waitingForUser
    })

    try {
      const tx = await signer.sendTransaction({
        to: address,
        value: parseEther(amount) // ETH -> Wei
      })
      setTransactionHash(tx.hash)
      setMessage({
        status: 'loading',
        text: getTransactionMessage().waitingConfirmation
      })

      await tx.wait()

      setMessage({
        status: 'success',
        text: getTransactionMessage().success
      })
    } catch (error) {
      setMessage(null)
    }
  }

  return (
    <div className={styleWeb3}>
      <Account />
      {message ? (
        <Alert message={message} transactionHash={transactionHash} />
      ) : (
        <InputGroup sendTransaction={sendTransaction} />
      )}
    </div>
  )
}
