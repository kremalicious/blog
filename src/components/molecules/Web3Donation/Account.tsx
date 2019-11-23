import React from 'react'
import { toDataUrl } from 'ethereum-blockies'
import { formatEther } from '@ethersproject/units'
import styles from './Account.module.scss'
import useWeb3, { getBalance } from '../../../hooks/use-web3'

export default function Account() {
  const { library, account } = useWeb3()
  const ethBalance = account && getBalance(account, library)
  const blockies = account && toDataUrl(account)

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
