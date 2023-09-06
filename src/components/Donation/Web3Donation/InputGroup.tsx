import { type ReactElement } from 'react'
import Input from '@components/Input'
import Conversion from './Conversion'
import styles from './InputGroup.module.css'

export default function InputGroup({
  amount,
  isDisabled,
  symbol,
  setAmount
}: {
  amount: string
  isDisabled: boolean
  symbol: string
  setAmount(amount: string): void
}): ReactElement {
  return (
    <>
      <div className={styles.inputGroup}>
        <div className={styles.input}>
          <Input
            type="text"
            inputMode="decimal"
            pattern="[0-9.]*"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.inputInput}
            disabled={isDisabled}
          />
          <div className={styles.currency}>
            <span>{symbol}</span>
          </div>
        </div>
        <button className="btn btn-primary" disabled={isDisabled}>
          Make it rain
        </button>
      </div>
      <Conversion amount={amount} symbol={symbol} />
    </>
  )
}
