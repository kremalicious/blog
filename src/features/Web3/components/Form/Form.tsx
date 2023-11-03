import { type ReactElement, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { InputGroup } from '../Input'
import styles from './Form.module.css'
import { useStore } from '@nanostores/react'
import { $selectedToken, $isInitSend, $amount } from '@features/Web3/stores'
import siteConfig from '@config/blog.config'
import { Send } from '../Send'
import { RainbowKit } from '../RainbowKit/RainbowKit'

export function Web3Form(): ReactElement {
  const { address: account } = useAccount()
  const selectedToken = useStore($selectedToken)
  const isInitSend = useStore($isInitSend)
  const amount = useStore($amount)

  const isDisabled = !account

  // reset amount whenever token changes
  useEffect(() => {
    if (!selectedToken) return
    $amount.set('')
  }, [selectedToken])

  return (
    <div className={styles.web3}>
      {isInitSend ? (
        <Send />
      ) : (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            if (amount === '' || amount === '0') return
            $isInitSend.set(true)
          }}
        >
          <RainbowKit />
          <InputGroup isDisabled={isDisabled} />
          <div className={styles.disclaimer}>
            Sends tokens to my account{' '}
            <code>{siteConfig.author.ether.ens}</code>
          </div>
        </form>
      )}
    </div>
  )
}
