import React, { ReactElement, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { parseEther } from 'viem'
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import Alert, { getTransactionMessage } from './Alert'
import InputGroup from './InputGroup'
import styles from './index.module.css'

export default function Web3Donation({
  address
}: {
  address: string
}): ReactElement {
  const [amount, setAmount] = useState('0.01')
  const [debouncedAmount] = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
    to: address,
    value: debouncedAmount ? parseEther(debouncedAmount) : undefined
  })
  const { sendTransactionAsync, isError, isSuccess } =
    useSendTransaction(config)

  const [message, setMessage] = useState<{ status: string; text: string }>()
  const [transactionHash, setTransactionHash] = useState<string>()

  async function handleSendTransaction() {
    setMessage({
      status: 'loading',
      text: getTransactionMessage().waitingForUser
    })

    try {
      const result = await sendTransactionAsync()

      if (isError) {
        throw new Error(null)
      }

      setTransactionHash(result?.hash)
      setMessage({
        status: 'loading',
        text: getTransactionMessage().waitingConfirmation
      })

      if (isSuccess) {
        setMessage({
          status: 'success',
          text: getTransactionMessage().success
        })
      }
    } catch (error) {
      setMessage(null)
    }
  }

  return (
    <form
      className={styles.web3}
      onSubmit={(e) => {
        e.preventDefault()
        handleSendTransaction()
      }}
    >
      <ConnectButton chainStatus="icon" showBalance={false} />

      {message ? (
        <Alert message={message} transactionHash={transactionHash} />
      ) : (
        <InputGroup amount={amount} setAmount={setAmount} />
      )}
    </form>
  )
}