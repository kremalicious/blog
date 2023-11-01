import { type ReactElement, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Alert from '../Alert/Alert'
import { InputGroup } from '../Input'
import styles from './index.module.css'
import { SendPrepareNative, SendPrepareErc20 } from '../SendPrepare'
import { useSend } from '../../hooks/useSend'
import type { SendFormData } from './types'
import { useTokens } from '@features/Web3/hooks/useTokens'

export default function Web3Form(): ReactElement {
  const { address: account } = useAccount()
  const { selectedToken } = useTokens()

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
      <div className={styles.rainbowkit}>
        <ConnectButton chainStatus="full" showBalance={false} />
      </div>

      {message && message.status !== 'error' ? (
        <Alert message={message} transactionHash={data?.hash} />
      ) : (
        <InputGroup
          amount={amount}
          setAmount={setAmount}
          isDisabled={isDisabled}
        />
      )}

      {message && message?.status === 'error' ? (
        <Alert message={message} />
      ) : null}

      {selectedToken?.address === '0x0' ? (
        <SendPrepareNative
          amount={debouncedAmount}
          setSendFormData={setSendFormData}
        />
      ) : (
        <SendPrepareErc20
          amount={debouncedAmount}
          setSendFormData={setSendFormData}
        />
      )}

      <div className={styles.disclaimer}>
        Sends tokens to my account, suitable for any ERC-20 token.
      </div>
    </form>
  )
}
