import React from 'react'
import Blockies from 'react-blockies'
import styles from './Account.module.scss'

const Account = ({ account }: { account: string }) => (
  <div className={styles.account} title={account}>
    <Blockies seed={account} scale={2} size={8} className={styles.identicon} />
    {account}
  </div>
)

export default Account
