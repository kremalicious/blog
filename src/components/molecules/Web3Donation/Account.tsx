import React, { ReactElement } from 'react'
import { toDataUrl } from 'ethereum-blockies'
import {
  accountWrap,
  blockies as styleBlockies,
  balance,
  link
} from './Account.module.css'
import { useAccount, useBalance, useEnsAvatar, useEnsName } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Account(): ReactElement {
  const { data: account } = useAccount()
  const { data: balance } = useBalance({ addressOrName: account?.address })
  const { data: ens } = useEnsName({
    address: account?.address
  })
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
  const avatar = account?.address && (ensAvatar || toDataUrl(account.address))

  const accountDisplay =
    account?.address &&
    (ens ||
      `${account.address.substring(0, 8)}...${account.address.substring(
        account.address.length - 4
      )}`)
  const balanceDisplay = balance && `${balance.formatted} ${balance?.symbol}`

  return account?.address ? (
    <div className={accountWrap} title={account?.address}>
      <span>
        <img className={styleBlockies} src={avatar} alt="Avatar" />
        {accountDisplay}
      </span>
      <span>{balanceDisplay}</span>
    </div>
  ) : (
    <ConnectButton />
    // <button
    //   className={`link ${link}`}
    //   onClick={() => activate(connectors.MetaMask)}
    // >
    //   Connect MetaMask
    // </button>
  )
}
