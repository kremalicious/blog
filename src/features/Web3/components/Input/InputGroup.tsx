import Input from '@components/Input'
import {
  $amount,
  $isInitSend,
  $selectedToken,
  $setAmount
} from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import { type ReactElement, useState } from 'react'
import { Conversion } from '../Conversion'
import { TokenSelect } from '../TokenSelect'
import styles from './InputGroup.module.css'

export function InputGroup({
  isDisabled,
  error
}: {
  isDisabled: boolean
  error: string | undefined
}): ReactElement {
  const amount = useStore($amount)
  const selectedToken = useStore($selectedToken)

  const [isFocus, setIsFocus] = useState(false)

  function handleChange(newAmount: string) {
    $setAmount(newAmount)
  }

  return (
    <>
      <div
        className={`${styles.inputGroup} ${isFocus ? styles.focus : ''} ${
          error ? styles.error : ''
        }`}
      >
        <div className={styles.token}>
          <TokenSelect />
        </div>
        <Input
          type="text"
          inputMode="decimal"
          pattern="[0-9.]*"
          lang="en-US"
          value={amount}
          placeholder="0.00"
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={styles.inputInput}
        />
        <button
          type="button"
          className={`${styles.submit} btn btn-primary`}
          disabled={
            isDisabled ||
            !amount ||
            amount === '' ||
            !selectedToken ||
            Boolean(error)
          }
          onClick={() => $isInitSend.set(true)}
        >
          Preview
        </button>

        {error ? <span className={styles.errorOutput}>{error}</span> : null}
      </div>

      <div className={styles.conversion}>
        <Conversion />
      </div>
    </>
  )
}
