import React, { ReactElement, useState } from 'react'
import useWeb3 from '../../../hooks/useWeb3'
import Input from '../../atoms/Input'
import Conversion from './Conversion'
import { inputGroup, input, currency } from './InputGroup.module.css'

export default function InputGroup({
  sendTransaction
}: {
  sendTransaction(amount: string): void
}): ReactElement {
  const { account } = useWeb3()
  const [amount, setAmount] = useState('0.01')

  const onAmountChange = ({ target }: { target: any }) => {
    setAmount(target.value)
  }

  return (
    <>
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
          disabled={!account}
        >
          Make it rain
        </button>
      </div>
      <Conversion amount={amount} />
    </>
  )
}
