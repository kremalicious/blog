import { type ReactElement } from 'react'
import Input from '@components/Input'
import { Conversion } from '../Conversion'
import styles from './InputGroup.module.css'
import { TokenSelect } from '../Tokens'

export function InputGroup({
  amount,
  isDisabled,
  symbol,
  setAmount,
  setToken
}: {
  amount: string
  isDisabled: boolean
  symbol: string
  setAmount(amount: string): void
  setToken(token: string): void
}): ReactElement {
  return (
    <>
      <div className={styles.inputGroup}>
        <div className={styles.token}>
          <TokenSelect setToken={setToken} />
        </div>
        <Input
          type="text"
          inputMode="decimal"
          pattern="[0-9.]*"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.inputInput}
          disabled={isDisabled}
        />
        <button
          className={`${styles.submit} btn btn-primary`}
          disabled={isDisabled}
        >
          Make it rain
        </button>
      </div>
      <Conversion amount={amount} symbol={symbol} />
    </>
  )
}
