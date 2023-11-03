import { type ReactElement } from 'react'
import Input from '@components/Input'
import { Conversion } from '../Conversion'
import styles from './InputGroup.module.css'
import { TokenSelect } from '../TokenSelect'
import { $amount, $isInitSend, $selectedToken } from '@features/Web3/stores'
import { useStore } from '@nanostores/react'

export function InputGroup({
  isDisabled
}: {
  isDisabled: boolean
}): ReactElement {
  const amount = useStore($amount)
  const selectedToken = useStore($selectedToken)

  function handleChange(newAmount: string) {
    $amount.set(newAmount)
  }

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
            onChange={(e) => handleChange(e.target.value)}
            className={styles.inputInput}
          />
        </div>

        <button
          className={`${styles.submit} btn btn-primary`}
          disabled={isDisabled || !amount || !selectedToken}
          onClick={() => $isInitSend.set(true)}
        >
          Preview
        </button>
      </div>
      <Conversion />
    </>
  )
}
