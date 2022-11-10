import React, { ReactElement, useState } from 'react'
import { parseEther } from '@ethersproject/units'
import { useDebounce } from 'use-debounce'
import InputGroup from './InputGroup'
import Alert, { getTransactionMessage } from './Alert'
import * as styles from './index.module.css'
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Web3Donation({
  address
}: {
  address: string
}): ReactElement {
  const [amount, setAmount] = useState('0.01')
  const [debouncedAmount] = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
    request: {
      to: address,
      value: debouncedAmount ? parseEther(debouncedAmount) : undefined
    }
  })
  const { sendTransactionAsync } = useSendTransaction(config)

  const [message, setMessage] = useState<{ status: string; text: string }>()
  const [transactionHash, setTransactionHash] = useState<string>()

  async function handleSendTransaction() {
    setMessage({
      status: 'loading',
      text: getTransactionMessage().waitingForUser
    })

    try {
      const tx = await sendTransactionAsync()
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
