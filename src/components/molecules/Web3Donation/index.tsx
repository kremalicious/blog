import React, { ReactElement, useState, useEffect } from 'react'
import { parseEther } from '@ethersproject/units'
import useWeb3, { getErrorMessage } from '../../../hooks/use-web3'
import InputGroup from './InputGroup'
import Alert, { getTransactionMessage } from './Alert'
import { web3 as styleWeb3 } from './index.module.css'
import Account from './Account'

export default function Web3Donation({
  address
}: {
  address: string
}): ReactElement {
  const { connector, library, chainId, account, active, error } = useWeb3()
  const [message, setMessage] = useState({})

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

    try {
      const tx = await signer.sendTransaction({
        to: address,
        value: parseEther(amount.toString()) // ETH -> Wei
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
    } catch (error) {
      setMessage({
        status: 'error',
        text: error.message
      })
    }
  }

  return (
    <div className={styleWeb3}>
      <Account />
      {message ? (
        <Alert message={message} transactionHash={transactionHash} />
      ) : (
        <InputGroup sendTransaction={sendTransaction} />
      )}
    </div>
  )
}
