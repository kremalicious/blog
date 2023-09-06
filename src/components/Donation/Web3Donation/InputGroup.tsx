import { type ReactElement } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import Input from '../../core/Input'
import Conversion from './Conversion'
import styles from './InputGroup.module.css'

export default function InputGroup({
  amount,
  setAmount
}: {
  amount: string
  setAmount(amount: string): void
}): ReactElement {
  const { address } = useAccount()
  const { chain } = useNetwork()

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
            disabled={!address}
          />
          <div className={styles.currency}>
            <span>{chain?.nativeCurrency?.symbol || 'ETH'}</span>
          </div>
        </div>
        <button className="btn btn-primary" disabled={!address}>
          Make it rain
        </button>
      </div>
      <Conversion amount={amount} />
    </>
  )
}
