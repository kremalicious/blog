import React from 'react'
import styles from './Alerts.module.scss'

export const alertMessages = (
  networkName?: string,
  transactionHash?: string
) => ({
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

interface AlertProps {
  transactionHash: string
  message?: { text?: string; status?: string }
}

const constructMessage = (
  transactionHash: string,
  message?: { text?: string }
) =>
  transactionHash
    ? message &&
      message.text + '<br />' + alertMessages(null, transactionHash).transaction
    : message && message.text

const classes = (status: string) =>
  status === 'success'
    ? styles.success
    : status === 'error'
    ? styles.error
    : styles.alert

export default function Alerts({ transactionHash, message }: AlertProps) {
  return (
    <div
      className={classes(message.status)}
      dangerouslySetInnerHTML={{
        __html: `${constructMessage(transactionHash, message)}`
      }}
    />
  )
}
