import { type ReactElement } from 'react'
import Input from '@components/Input'
import { Conversion } from '../Conversion'
import styles from './InputGroup.module.css'
import { TokenSelect } from '../TokenSelect'
import config from '@config/blog.config'
import type { GetToken } from '../../hooks/useTokens'

export function InputGroup({
  amount,
  token,
  isDisabled,
  setAmount,
  setTokenSelected
}: {
  amount: string
  token: GetToken | undefined
  isDisabled: boolean
  setAmount: React.Dispatch<React.SetStateAction<string>>
  setTokenSelected: React.Dispatch<React.SetStateAction<GetToken>>
}): ReactElement {
  return (
    <>
      <div className={styles.inputGroup}>
        <div className={styles.token}>
          <TokenSelect
            selectedToken={token}
            setTokenSelected={setTokenSelected}
          />
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
      <Conversion amount={amount} token={token} />
      <div className={styles.disclaimer}>
        This form sends tokens to my account <code>{config.author.ether}</code>
      </div>
    </>
  )
}
