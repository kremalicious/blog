import siteConfig from '@config/blog.config'
import {
  $amount,
  $isInitSend,
  $selectedToken,
  $setAmount
} from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import { type ReactElement, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { InputGroup } from '../Input'
import { RainbowKit } from '../RainbowKit/RainbowKit'
import { Send } from '../Send'
import styles from './Form.module.css'

export function Web3Form(): ReactElement {
  const { address: account } = useAccount()
  const selectedToken = useStore($selectedToken)
  const isInitSend = useStore($isInitSend)
  const amount = useStore($amount)

  const isDisabled = !account

  const [error, setError] = useState<string>()

  // Error Validation
  useEffect(() => {
    if (!amount || amount === '' || !selectedToken?.balance) {
      setError(undefined)
      return
    }

    if (Number(amount) > Number(selectedToken?.balance)) {
      setError('Exceeds balance')
    } else {
      setError(undefined)
    }
  }, [amount, selectedToken?.balance])

  // reset amount whenever token changes
  useEffect(() => {
    if (!selectedToken) return
    $setAmount('')
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
          <InputGroup isDisabled={isDisabled} error={error} />
          <div className={styles.disclaimer}>
            Sends tokens to my account{' '}
            <code>{siteConfig.author.ether.ens}</code>
          </div>
        </form>
      )}
    </div>
  )
}
