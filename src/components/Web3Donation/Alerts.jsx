import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Alerts.module.scss'

const Message = ({ message, ...props }) => (
  <div dangerouslySetInnerHTML={{ __html: message }} {...props} />
)

export default class Alerts extends PureComponent {
  static propTypes = {
    hasCorrectNetwork: PropTypes.bool,
    hasAccount: PropTypes.bool,
    networkName: PropTypes.string,
    error: PropTypes.object,
    transactionHash: PropTypes.string,
    web3Connected: PropTypes.bool
  }

  alertMessages = (networkName, transactionHash) => ({
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

  render() {
    const {
      hasCorrectNetwork,
      hasAccount,
      networkName,
      error,
      transactionHash,
      web3Connected
    } = this.props

    return (
      <div className={styles.alert}>
        {!web3Connected ? (
          <Message message={this.alertMessages().noWeb3} />
        ) : (
          <Fragment>
            {!hasAccount && (
              <Message message={this.alertMessages().noAccount} />
            )}
            {!hasCorrectNetwork && (
              <Message
                message={this.alertMessages(networkName).noCorrectNetwork}
              />
            )}
            {error && <Message message={error.message} />}

            {transactionHash && (
              <Message
                className={styles.success}
                message={this.alertMessages(transactionHash).success}
              />
            )}
          </Fragment>
        )}
      </div>
    )
  }
}
