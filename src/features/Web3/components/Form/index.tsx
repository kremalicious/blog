import { type ReactElement, useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Alert from '../Alert/Alert'
import { InputGroup } from '../Input'
import styles from './index.module.css'
import { SendPrepareNative, SendPrepareErc20 } from '../SendPrepare'
import { useSend } from '../../hooks/useSend'
import type { SendFormData } from './types'
import { useStore } from '@nanostores/react'
import { $selectedToken } from '@features/Web3/stores/selectedToken'
import siteConfig from '@config/blog.config'

export default function Web3Form(): ReactElement {
  const { address: account } = useAccount()
  const selectedToken = useStore($selectedToken)

  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount, 500)
  const [sendFormData, setSendFormData] = useState<SendFormData>()

  const { data, send } = sendFormData || {}
  const { message } = useSend(sendFormData)

  const isDisabled = !account

  useEffect(() => {
    if (!selectedToken) return
    setAmount('')
  }, [selectedToken])

  return (
    <form
      className={styles.web3}
      onSubmit={async (e) => {
        e.preventDefault()
        if (!send || debouncedAmount === '' || debouncedAmount === '0') return
        await send()
      }}
    >
      {message && message.status !== 'error' ? (
        <Alert message={message} transactionHash={data?.hash} />
      ) : (
        <>
          <div className={styles.rainbowkit}>
            <ConnectButton chainStatus="full" showBalance={false} />
          </div>
          <InputGroup
            amount={amount}
            setAmount={setAmount}
            isDisabled={isDisabled}
          />
          <div className={styles.disclaimer}>
            Sends tokens to my account{' '}
            <code>{siteConfig.author.ether.ens}</code>
          </div>
        </>
      )}

      {selectedToken?.address === '0x0' ? (
        <SendPrepareNative
          amount={debouncedAmount}
          setSendFormData={setSendFormData}
        />
      ) : selectedToken ? (
        <SendPrepareErc20
          amount={debouncedAmount}
          setSendFormData={setSendFormData}
        />
      ) : null}
    </form>
  )
}