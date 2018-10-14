import React from 'react'
import PropTypes from 'prop-types'
import Blockies from 'react-blockies'
import styles from './Account.module.scss'

const Account = ({ account }) => (
  <div className={styles.account} title={account}>
    <Blockies seed={account} scale={2} size={8} className={styles.identicon} />
    {account}
  </div>
)

Account.propTypes = {
  account: PropTypes.string.isRequired
}

export default Account
