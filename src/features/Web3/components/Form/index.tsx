import { type ReactElement, useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { InputGroup } from '../Input'
import styles from './index.module.css'
import { useStore } from '@nanostores/react'
import { $selectedToken } from '@features/Web3/stores/selectedToken'
import siteConfig from '@config/blog.config'
import { Send } from '../Send/Send'

export default function Web3Form(): ReactElement {
  const { address: account } = useAccount()
  const selectedToken = useStore($selectedToken)

  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount, 500)
  const [initSend, setInitSend] = useState(false)

  const isDisabled = !account

  useEffect(() => {
    if (!selectedToken) return
    setAmount('')
  }, [selectedToken])

  return initSend ? (
    <Send amount={debouncedAmount} setInitSend={setInitSend} />
  ) : (
    <form
      className={styles.web3}
      onSubmit={(e) => {
        e.preventDefault()
        if (debouncedAmount !== '' || debouncedAmount === '0') return
        setInitSend(true)
      }}
    >
      <>
        <div className={styles.rainbowkit}>
          <ConnectButton chainStatus="full" showBalance={false} />
        </div>
        <InputGroup
          amount={amount}
          setAmount={setAmount}
          setInitSend={setInitSend}
          isDisabled={isDisabled}
        />
        <div className={styles.disclaimer}>
          Sends tokens to my account <code>{siteConfig.author.ether.ens}</code>
        </div>
      </>
    </form>
  )
}
