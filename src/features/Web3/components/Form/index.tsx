import { type ReactElement, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Alert from '../Alert/Alert'
import { InputGroup } from '../Input'
import styles from './index.module.css'
import { SendNative, SendErc20 } from '../Send'
import { useSend } from '../../hooks/useSend'
import type { SendFormData } from './types'
import { $selectedToken } from '../../stores/selectedToken'
import { useStore } from '@nanostores/react'

export default function Web3Form(): ReactElement {
  const { address: account } = useAccount()
  const selectedToken = useStore($selectedToken)

  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount, 500)
  const [sendFormData, setSendFormData] = useState<SendFormData>()

  const { data, send } = sendFormData || {}
  const { message } = useSend(sendFormData)

  const isDisabled = !account

  return (
    <form
      className={styles.web3}
      onSubmit={async (e) => {
        e.preventDefault()
        if (!send || debouncedAmount === '' || debouncedAmount === '0') return
        await send()
      }}
    >
      <ConnectButton chainStatus="icon" showBalance={false} />

      {message ? (
        <Alert message={message} transactionHash={data?.hash} />
      ) : (
        <InputGroup
          amount={amount}
          setAmount={setAmount}
          isDisabled={isDisabled}
        />
      )}

      {selectedToken?.address === '0x0' ? (
        <SendNative
          amount={debouncedAmount}
          setSendFormData={setSendFormData}
        />
      ) : (
        <SendErc20 amount={debouncedAmount} setSendFormData={setSendFormData} />
      )}
    </form>
  )
}
