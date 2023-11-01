import { useEffect, type ReactElement, useState } from 'react'
import styles from './Conversion.module.css'
import { useStore } from '@nanostores/react'
import { $selectedToken } from '@features/Web3/stores/selectedToken'

export function Conversion({ amount }: { amount: string }): ReactElement {
  const selectedToken = useStore($selectedToken)

  const [dollar, setDollar] = useState('0.00')
  const [euro, setEuro] = useState('0.00')

  console.log(selectedToken?.price)

  useEffect(() => {
    if (!selectedToken?.price || !amount) {
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

  return (
    <div
      className={styles.conversion}
      title="Value in USD & EUR at current spot price for selected token on Coingecko."
    >
      <span>{`= $ ${dollar}`}</span>
      <span>{`= € ${euro}`}</span>
    </div>
  )
}
