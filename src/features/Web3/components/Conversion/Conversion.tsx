import { $amount, $selectedToken } from '@/features/Web3/stores'
import { useStore } from '@nanostores/react'
import { type ReactElement, useEffect, useState } from 'react'
import styles from './Conversion.module.css'

export function Conversion(): ReactElement | null {
  const selectedToken = useStore($selectedToken)
  const amount = useStore($amount)

  const [dollar, setDollar] = useState('0.00')
  const [euro, setEuro] = useState('0.00')

  useEffect(() => {
    if (!selectedToken?.price || !amount || amount === '') {
      setDollar('0.00')
      setEuro('0.00')
      return
    }

    const { eur, usd } = selectedToken.price

    const dollar = usd ? (Number(amount) * usd).toFixed(2) : '0.00'
    const euro = eur ? (Number(amount) * eur).toFixed(2) : '0.00'
    setDollar(dollar)
    setEuro(euro)
  }, [selectedToken?.price, amount])

  return selectedToken?.price?.usd !== 0 ? (
    <div
      className={styles.conversion}
      title="Value in USD & EUR at current spot price for selected token on Coingecko."
    >
      <span>{`= $ ${dollar}`}</span>
      <span>{`= € ${euro}`}</span>
    </div>
  ) : null
}
