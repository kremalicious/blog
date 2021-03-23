import React, { ReactElement, useState, useEffect } from 'react'
import { toDataUrl } from 'ethereum-blockies'
import { formatEther } from '@ethersproject/units'
import useWeb3, { connectors } from '../../../hooks/useWeb3'
import {
  accountWrap,
  blockies as styleBlockies,
  balance,
  link
} from './Account.module.css'

export default function Account(): ReactElement {
  const { library, account, activate } = useWeb3()
  const [ethBalance, setEthBalance] = useState('0')
  const blockies = account && toDataUrl(account)

  useEffect(() => {
    if (!library || !account) return

    async function init() {
      const balance = await library.getBalance(account)
      setEthBalance(balance.toString())
    }
    init()
  }, [library, account])

  const accountDisplay =
    account &&
    `${account.substring(0, 8)}...${account.substring(account.length - 4)}`
  const balanceDisplay =
    ethBalance && `Ξ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`

  return account ? (
    <div className={accountWrap} title={account}>
      <span>
        <img className={styleBlockies} src={blockies} alt="Blockies" />
        {accountDisplay}
      </span>
      <span className={balance}>{balanceDisplay}</span>
    </div>
  ) : (
    <button
      className={`link ${link}`}
      onClick={() => activate(connectors.MetaMask)}
    >
      Connect MetaMask
    </button>
  )
}
