import { type ReactElement, useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Alert, { getTransactionMessage } from './components/Alert/Alert'
import { InputGroup } from './components/Input'
import styles from './index.module.css'
import { SendNative, SendErc20 } from './components/Send'
import type { GetToken } from './hooks/useTokens'

export default function Web3Donation(): ReactElement {
  const { address: account } = useAccount()

  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount, 500)
  const [tokenSelected, setTokenSelected] = useState<GetToken>({
    address: '0x0'
  } as any)
  const [message, setMessage] = useState<{ status: string; text: string }>()
  const [sendFormData, setSendFormData] = useState<{
    data: { hash: `0x${string}` }
    send: () => Promise<void>
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    error: Error | null
  }>()

  const { data, send, isLoading, isSuccess, isError, error } =
    sendFormData || {}

  useEffect(() => {
    if (!isError || !error) return

    setMessage(
      error.message.includes('User rejected the request.')
        ? undefined
        : {
            status: 'error',
            text: error?.message as string
          }
    )
  }, [isError])

  useEffect(() => {
    if (!isLoading) return

    setMessage({
      status: 'loading',
      text: getTransactionMessage().waitingConfirmation
    })
  }, [isLoading])

  useEffect(() => {
    if (!isSuccess) return

    setMessage({
      status: 'success',
      text: getTransactionMessage().success
    })
  }, [isSuccess])

  const isDisabled = !account

  return (
    <form
      className={styles.web3}
      onSubmit={async (e) => {
        e.preventDefault()
        if (!send || amount === '' || amount === '0') return
        await send()
      }}
    >
      <ConnectButton chainStatus="icon" showBalance={false} />

      {message ? (
        <Alert message={message} transactionHash={data?.hash} />
      ) : (
        <InputGroup
          amount={amount}
          token={tokenSelected}
          setAmount={setAmount}
          setTokenSelected={setTokenSelected}
          isDisabled={isDisabled}
        />
      )}

      {tokenSelected?.address === '0x0' ? (
        <SendNative
          amount={debouncedAmount}
          setSendFormData={setSendFormData}
        />
      ) : (
        <SendErc20
          amount={debouncedAmount}
          tokenAddress={tokenSelected?.address}
          setSendFormData={setSendFormData}
        />
      )}
    </form>
  )
}
