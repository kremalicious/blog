import React, { ReactElement, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import Input from '../../atoms/Input'
import Conversion from './Conversion'
import {
  inputGroup,
  input,
  inputInput,
  currency
} from './InputGroup.module.css'

export default function InputGroup({
  sendTransaction
}: {
  sendTransaction(amount: string): void
}): ReactElement {
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const [amount, setAmount] = useState('0.01')

  const onAmountChange = ({ target }: { target: any }) => {
    setAmount(target.value)
  }

  return (
    <>
      <div className={inputGroup}>
        <div className={input}>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={onAmountChange}
            className={inputInput}
            disabled={!account}
          />
          <div className={currency}>
            <span>{activeChain?.nativeCurrency?.symbol || 'ETH'}</span>
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
