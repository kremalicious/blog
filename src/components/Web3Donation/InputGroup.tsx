import React from 'react'
import Input from '../atoms/Input'
import Account from './Account'
import Conversion from './Conversion'
import styles from './InputGroup.module.scss'

export default function InputGroup({
  amount,
  onAmountChange,
  sendTransaction,
  selectedAccount
}: {
  amount: number
  onAmountChange(target: any): void
  sendTransaction(): void
  selectedAccount?: string | null
}) {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.input}>
        <Input
          type="number"
          value={amount}
          onChange={onAmountChange}
          min="0"
          step="0.01"
        />
        <div className={styles.currency}>
          <span>ETH</span>
        </div>
      </div>
      <button className="btn btn-primary" onClick={sendTransaction}>
        Make it rain
      </button>
      <div className={styles.infoline}>
        <Conversion amount={amount} />
        {selectedAccount && <Account account={selectedAccount} />}
      </div>
    </div>
  )
}
