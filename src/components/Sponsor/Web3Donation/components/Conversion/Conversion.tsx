import { type ReactElement, useEffect, useState } from 'react'
import styles from './Conversion.module.css'
import { getFiat } from '../../api/getFiat'

export function Conversion({
  amount,
  symbol
}: {
  amount: string
  symbol: string
}): ReactElement {
  const [conversion, setConversion] = useState({
    euro: '0.00',
    dollar: '0.00'
  })
  const { dollar, euro } = conversion

  useEffect(() => {
    async function getFiatResponse() {
      try {
        const tokenId = symbol === 'MATIC' ? 'matic-network' : 'ethereum'
        const { dollar, euro } = await getFiat({
          amount: Number(amount),
          tokenId
        })
        setConversion({ euro, dollar })
      } catch (error) {
        console.error((error as Error).message)
      }
    }

    getFiatResponse()
  }, [amount, symbol])

  return (
    <div className={styles.conversion}>
      <span>{dollar !== '0.00' && `= $ ${dollar}`}</span>
      <span>{euro !== '0.00' && `= € ${euro}`}</span>
    </div>
  )
}
