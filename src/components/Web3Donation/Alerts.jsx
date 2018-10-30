import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Alerts.module.scss'

export const alertMessages = (networkName, transactionHash) => ({
  noAccount:
    'Web3 detected, but no account. Are you logged into your MetaMask account?',
  noCorrectNetwork: `Please connect to <strong>Main</strong> network. You are on <strong>${networkName}</strong> right now.`,
  noWeb3:
    'No Web3 detected. Install <a href="https://metamask.io">MetaMask</a>, <a href="https://brave.com">Brave</a>, or <a href="https://github.com/ethereum/mist">Mist</a>.',
  transaction: `<a href="https://etherscan.io/tx/${transactionHash}" target="_blank">See your transaction on etherscan.io.</a>`,
  waitingForUser: 'Waiting for your confirmation',
  waitingConfirmation: 'Waiting for network confirmation, hang on',
  success: 'Confirmed. You are awesome, thanks!'
})

export default class Alerts extends PureComponent {
  static propTypes = {
    message: PropTypes.object,
    transactionHash: PropTypes.string
  }

  constructMessage = () => {
    const { transactionHash, message } = this.props

    let messageOutput

    if (transactionHash) {
      messageOutput =
        message.text +
        '<br />' +
        alertMessages(null, transactionHash).transaction
    } else {
      messageOutput = message.text
    }

    return messageOutput
  }

  classes() {
    const { status } = this.props.message

    if (status === 'success') {
      return styles.success
    } else if (status === 'error') {
      return styles.error
    }
    return styles.alert
  }

  render() {
    return (
      <div
        className={this.classes()}
        dangerouslySetInnerHTML={{ __html: this.constructMessage() }}
      />
    )
  }
}
