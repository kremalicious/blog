import { type ReactElement, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Alert from '../Alert/Alert'
import { InputGroup } from '../Input'
import styles from './index.module.css'
import { SendNative, SendErc20 } from '../Send'
import type { GetToken } from '../../hooks/useTokens'
import { useSend } from '@features/Web3/hooks/useSend'
import type { SendFormData } from './types'

export default function Web3Form(): ReactElement {
  const { address: account } = useAccount()

  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount, 500)
  const [tokenSelected, setTokenSelected] = useState<GetToken>({
    address: '0x0'
  } as any)

  const [sendFormData, setSendFormData] = useState<SendFormData>()

  const { data, send } = sendFormData || {}
  const { message } = useSend(sendFormData)

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
