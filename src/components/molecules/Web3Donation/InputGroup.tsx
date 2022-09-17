import React, { ReactElement } from 'react'
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
      <div className={inputGroup}>
        <div className={input}>
          <Input
            type="text"
            inputMode="decimal"
            pattern="[0-9.]*"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputInput}
            disabled={!address}
          />
          <div className={currency}>
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
