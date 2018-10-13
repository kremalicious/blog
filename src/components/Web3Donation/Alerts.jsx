import React from 'react'
import PropTypes from 'prop-types'
import styles from './Alerts.module.scss'

const Alerts = ({
  accounts,
  networkId,
  networkName,
  error,
  transactionHash
}) => {
  const isCorrectNetwork = networkId === '1'
  const hasAccount = accounts.length !== 0

  if (error || hasAccount || isCorrectNetwork)
    <div className={styles.alert}>
      {!hasAccount && (
        <div>
          Web3 detected, but no account. Are you logged into your MetaMask
          account?
        </div>
      )}
      {!isCorrectNetwork && (
        <div>
          Please connect to <strong>Main</strong> network. You are on{' '}
          <strong>{networkName}</strong> right now.
        </div>
      )}
      {error && <div>{error.message}</div>}
    </div>

  if (transactionHash)
    <div className={styles.success}>
      You are awesome, thanks!
      <br />
      <a href={`https://etherscan.io/tx/${transactionHash}`}>
        See your transaction on etherscan.io.
      </a>
    </div>

  return null
}

Alerts.propTypes = {
  accounts: PropTypes.array,
  networkId: PropTypes.string,
  networkName: PropTypes.string,
  error: PropTypes.object,
  transactionHash: PropTypes.string
}

export default Alerts
