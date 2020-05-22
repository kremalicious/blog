import React, { ReactElement } from 'react'
import styles from './Alert.module.scss'

export function getTransactionMessage(
  transactionHash?: string
): { [key: string]: string } {
  return {
    transaction: `<a href="https://etherscan.io/tx/${transactionHash}" target="_blank">See your transaction on etherscan.io.</a>`,
    waitingForUser: 'Waiting for your confirmation',
    waitingConfirmation: 'Waiting for network confirmation, hang on',
    success: 'Confirmed. You are awesome, thanks!'
  }
}

const constructMessage = (
  transactionHash: string,
  message?: { text?: string }
) =>
  transactionHash
    ? message &&
      message.text +
        '<br /><br />' +
        getTransactionMessage(transactionHash).transaction
    : message && message.text

const classes = (status: string) =>
  status === 'success'
    ? styles.success
    : status === 'error'
    ? styles.error
    : styles.alert

export default function Alert({
  transactionHash,
  message
}: {
  transactionHash: string
  message?: { text?: string; status?: string }
}): ReactElement {
  return (
    <div
      className={classes(message.status)}
      dangerouslySetInnerHTML={{
        __html: `${constructMessage(transactionHash, message)}`
      }}
    />
  )
}
