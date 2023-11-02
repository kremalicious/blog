import { type ReactElement, useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { InputGroup } from '../Input'
import styles from './index.module.css'
import { useStore } from '@nanostores/react'
import { $selectedToken, $isInitSend } from '@features/Web3/stores'
import siteConfig from '@config/blog.config'
import { Send } from '../Send'

export default function Web3Form(): ReactElement {
  const { address: account } = useAccount()
  const selectedToken = useStore($selectedToken)
  const isInitSend = useStore($isInitSend)

  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount, 500)

  const isDisabled = !account

  // reset amount whenever token changes
  useEffect(() => {
    if (!selectedToken) return
    setAmount('')
  }, [selectedToken])

  return isInitSend ? (
    <Send amount={debouncedAmount} />
  ) : (
    <form
      className={styles.web3}
      onSubmit={(e) => {
        e.preventDefault()
        if (debouncedAmount === '' || debouncedAmount === '0') return
        $isInitSend.set(true)
      }}
    >
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
          Sends tokens to my account <code>{siteConfig.author.ether.ens}</code>
        </div>
      </>
    </form>
  )
}
