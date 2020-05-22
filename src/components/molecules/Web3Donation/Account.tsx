import React, { ReactElement, useState, useEffect } from 'react'
import { toDataUrl } from 'ethereum-blockies'
import { formatEther } from '@ethersproject/units'
import useWeb3 from '../../../hooks/use-web3'
import styles from './Account.module.scss'

export default function Account(): ReactElement {
  const { library, account } = useWeb3()
  const [ethBalance, setEthBalance] = useState(0)
  const blockies = account && toDataUrl(account)

  useEffect(() => {
    if (!library || !account) return

    async function init() {
      const balance = await library.getBalance(account)
      setEthBalance(balance)
    }
    init()
  }, [library, account])

  const accountDisplay =
    account &&
    `${account.substring(0, 8)}...${account.substring(account.length - 4)}`
  const balanceDisplay =
    ethBalance && `Ξ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`

  return (
    <div className={styles.accountWrap} title={account}>
      <span className={styles.account}>
        <img className={styles.blockies} src={blockies} alt="Blockies" />
        {accountDisplay}
      </span>
      <span className={styles.balance}>{balanceDisplay}</span>
    </div>
  )
}
