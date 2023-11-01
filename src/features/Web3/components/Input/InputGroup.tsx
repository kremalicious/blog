import { type ReactElement } from 'react'
import Input from '@components/Input'
import { Conversion } from '../Conversion'
import styles from './InputGroup.module.css'
import { TokenSelect } from '../TokenSelect'

export function InputGroup({
  amount,
  isDisabled,
  setAmount
}: {
  amount: string
  isDisabled: boolean
  setAmount: React.Dispatch<React.SetStateAction<string>>
}): ReactElement {
  return (
    <>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrap}>
          <div className={styles.token}>
            <TokenSelect />
          </div>
          <Input
            type="text"
            inputMode="decimal"
            pattern="[0-9.]*"
            value={amount}
            placeholder="0.00"
            onChange={(e) => setAmount(e.target.value)}
            className={styles.inputInput}
          />
        </div>

        <button
          className={`${styles.submit} btn btn-primary`}
          disabled={isDisabled || !amount}
        >
          Make it rain
        </button>
      </div>
      <Conversion amount={amount} />
    </>
  )
}
