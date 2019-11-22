import React, { useState, useEffect } from 'react'
import styles from './Conversion.module.scss'

export async function getFiat(amount: number) {
  const url = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'
  const response = await fetch(url)
  if (!response.ok) console.error(response.statusText)
  const data = await response.json()
  /* eslint-disable @typescript-eslint/camelcase */
  const { price_usd, price_eur } = data[0]
  const dollar = (amount * price_usd).toFixed(2)
  const euro = (amount * price_eur).toFixed(2)
  /* eslint-enable @typescript-eslint/camelcase */

  return { dollar, euro }
}

export default function Conversion({ amount }: { amount: number }) {
  const [conversion, setConversion] = useState({
    euro: '0.00',
    dollar: '0.00'
  })
  const { dollar, euro } = conversion

  async function getFiatResponse() {
    try {
      const { dollar, euro } = await getFiat(amount)
      setConversion({ euro, dollar })
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getFiatResponse()
  }, [amount])

  return (
    <div className={styles.conversion}>
      <span>{dollar !== '0.00' && `= $ ${dollar}`}</span>
      <span>{euro !== '0.00' && `= € ${euro}`}</span>
    </div>
  )
}
