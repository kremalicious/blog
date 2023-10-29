import { useEffect, type ReactElement, useState } from 'react'
import styles from './Conversion.module.css'
import type { GetToken } from '../../hooks/useTokens'

export function Conversion({
  amount,
  token
}: {
  amount: string
  token: GetToken | undefined
}): ReactElement {
  const [dollar, setDollar] = useState('0.00')
  const [euro, setEuro] = useState('0.00')

  useEffect(() => {
    if (!token?.price || !amount) {
      setDollar('0.00')
      setEuro('0.00')
      return
    }

    const dollar = token?.price?.usd
      ? (Number(amount) * token?.price?.usd).toFixed(2)
      : '0.00'
    const euro = token?.price?.eur
      ? (Number(amount) * token?.price?.eur).toFixed(2)
      : '0.00'
    setDollar(dollar)
    setEuro(euro)
  }, [token?.price, amount])

  return (
    <div className={styles.conversion}>
      <span>{dollar !== '0.00' && `= $ ${dollar}`}</span>
      <span>{euro !== '0.00' && `= € ${euro}`}</span>
    </div>
  )
}
