import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './Alerts.module.scss'

const alertMessages = (networkName, transactionHash) => ({
  noAccount:
    'Web3 detected, but no account. Are you logged into your MetaMask account?',
  noCorrectNetwork: `Please connect to <strong>Main</strong> network. You are on <strong>${networkName}</strong> right now.`,
  noWeb3:
    'No Web3 detected. Install <a href="https://metamask.io">MetaMask</a>, <a href="https://brave.com">Brave</a>, or <a href="https://github.com/ethereum/mist">Mist</a>.',
  success: `You are awesome, thanks!<br />
      <a href="https://etherscan.io/tx/${transactionHash}">
        See your transaction on etherscan.io.
      </a>`
})

const Alerts = ({
  hasCorrectNetwork,
  hasAccount,
  networkName,
  error,
  transactionHash,
  web3Connected
}) => {
  return !web3Connected ? (
    <small dangerouslySetInnerHTML={{ __html: alertMessages().noWeb3 }} />
  ) : (
    <Fragment>
      <div className={styles.alert}>
        {!hasAccount && <div>{alertMessages().noaccount}</div>}
        {!hasCorrectNetwork && (
          <div
            dangerouslySetInnerHTML={{
              __html: alertMessages(networkName).noCorrectNetwork
            }}
          />
        )}
        {error && <div>{error.message}</div>}
      </div>

      {transactionHash && (
        <div
          className={styles.success}
          dangerouslySetInnerHTML={{
            __html: alertMessages(transactionHash).success
          }}
        />
      )}
    </Fragment>
  )
}

Alerts.propTypes = {
  hasCorrectNetwork: PropTypes.bool,
  hasAccount: PropTypes.bool,
  networkName: PropTypes.string,
  error: PropTypes.object,
  transactionHash: PropTypes.string,
  web3Connected: PropTypes.bool
}

export default Alerts
