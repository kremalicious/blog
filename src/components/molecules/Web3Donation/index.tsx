import React, { ReactElement, useState } from 'react'
import { parseEther } from '@ethersproject/units'
import InputGroup from './InputGroup'
import Alert, { getTransactionMessage } from './Alert'
import { web3 as styleWeb3 } from './index.module.css'
import { useSigner } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

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
      <ConnectButton chainStatus="icon" showBalance={false} />
      {message ? (
        <Alert message={message} transactionHash={transactionHash} />
      ) : (
        <InputGroup sendTransaction={sendTransaction} />
      )}
    </div>
  )
}
