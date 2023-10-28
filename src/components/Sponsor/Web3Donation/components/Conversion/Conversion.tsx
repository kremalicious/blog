import { type ReactElement } from 'react'
import styles from './Conversion.module.css'
import type { GetToken } from '../../api/getTokens'

export function Conversion({
  amount,
  token
}: {
  amount: string
  token: GetToken | undefined
}): ReactElement {
  const dollar = token?.price?.usd
    ? (Number(amount) * token?.price?.usd).toFixed(2)
    : '0.00'
  const euro = token?.price?.eur
    ? (Number(amount) * token?.price?.eur).toFixed(2)
    : '0.00'

  return (
    <div className={styles.conversion}>
      <span>{dollar !== '0.00' && `= $ ${dollar}`}</span>
      <span>{euro !== '0.00' && `= € ${euro}`}</span>
    </div>
  )
}
