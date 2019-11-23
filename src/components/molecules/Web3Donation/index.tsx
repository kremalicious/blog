import React, { useState, useEffect } from 'react'
import useWeb3, { connectors, getErrorMessage } from '../../../hooks/use-web3'
import InputGroup from './InputGroup'
import Alert, { getTransactionMessage } from './Alert'
import styles from './index.module.scss'

export default function Web3Donation({ address }: { address: string }) {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    active,
    error
  } = useWeb3()
  const [message, setMessage] = useState()

  useEffect(() => {
    setMessage(undefined)

    error &&
      setMessage({
        status: 'error',
        text: getErrorMessage(error, chainId)
      })
  }, [connector, account, library, chainId, active, error])

  const [transactionHash, setTransactionHash] = useState(undefined)

  async function sendTransaction(amount: number) {
    const signer = library.getSigner()

    setMessage({
      status: 'loading',
      text: getTransactionMessage().waitingForUser
    })

    const tx = await signer.sendTransaction({
      to: address,
      value: amount * 1e18 // ETH -> Wei
    })
    setTransactionHash(tx.hash)
    setMessage({
      status: 'loading',
      text: getTransactionMessage().waitingConfirmation
    })

    await tx.wait()

    setMessage({
      status: 'success',
      text: getTransactionMessage().success
    })
  }

  return (
    <div className={styles.web3}>
      {!active && !message ? (
        <button className="link" onClick={() => activate(connectors.MetaMask)}>
          Activate Web3
        </button>
      ) : library && account && !message ? (
        <InputGroup sendTransaction={sendTransaction} />
      ) : (
        message && <Alert message={message} transactionHash={transactionHash} />
      )}
    </div>
  )
}
