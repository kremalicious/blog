import { type ReactElement } from 'react'
import Input from '@components/Input'
import { Conversion } from '../Conversion'
import styles from './InputGroup.module.css'
import { TokenSelect } from '../Tokens'
import config from '@config/blog.config'

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
          placeholder="0.00"
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
      <div className={styles.disclaimer}>
        This form sends tokens to my account <code>{config.author.ether}</code>
      </div>
    </>
  )
}
