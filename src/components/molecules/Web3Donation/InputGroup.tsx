import React, { ReactElement, useState } from 'react'
import Input from '../../atoms/Input'
import Account from './Account'
import Conversion from './Conversion'
import { inputGroup, input, currency } from './InputGroup.module.css'

export default function InputGroup({
  sendTransaction
}: {
  sendTransaction(amount: number): void
}): ReactElement {
  const [amount, setAmount] = useState(0.03)

  const onAmountChange = ({ target }: { target: any }) => {
    setAmount(target.value)
  }

  return (
    <div>
      <Account />
      <div className={inputGroup}>
        <div className={input}>
          <Input
            type="number"
            value={amount}
            onChange={onAmountChange}
            min="0"
            step="0.01"
          />
          <div className={currency}>
            <span>ETH</span>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => sendTransaction(amount)}
        >
          Make it rain
        </button>
      </div>
      <Conversion amount={amount} />
    </div>
  )
}
