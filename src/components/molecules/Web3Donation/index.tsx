import React, { useEffect, useState } from 'react'
import { useWeb3Context } from 'web3-react'
import InputGroup from './InputGroup'
import Alerts, { alertMessages } from './Alerts'
import styles from './index.module.scss'

export default function Web3Donation({ address }: { address: string }) {
  const {
    setFirstValidConnector,
    error,
    library,
    active,
    account
  } = useWeb3Context()
  const [amount, setAmount] = useState(0.03)
  const [message, setMessage] = useState()

  useEffect(() => {
    setFirstValidConnector(['MetaMask'])
  }, [])

  error &&
    setMessage({
      status: 'error',
      text: error.message
    })

  const [transactionHash, setTransactionHash] = useState(undefined)

  async function sendTransaction() {
    const signer = library.getSigner()

    setMessage({
      status: 'loading',
      text: alertMessages().waitingForUser
    })

    const tx = await signer.sendTransaction({
      to: address,
      value: amount * 1e18 // ETH -> Wei
    })
    setTransactionHash(tx.hash)
    setMessage({
      status: 'loading',
      text: alertMessages().waitingConfirmation
    })

    // setMessage({
    //   status: 'success',
    //   text: alertMessages().success
    // })
  }

  const onAmountChange = ({ target }: { target: any }) => {
    setAmount(target.value)
  }

  return (
    <div className={styles.web3}>
      {active && !message ? (
        <InputGroup
          selectedAccount={account}
          amount={amount}
          onAmountChange={onAmountChange}
          sendTransaction={sendTransaction}
        />
      ) : (
        message && (
          <Alerts message={message} transactionHash={transactionHash} />
        )
      )}
    </div>
  )
}

//   sendTransaction = () => {
//     const { web3 } = this

//     this.setState({
//       inTransaction: true,
//       message: { text: alertMessages().waitingForUser }
//     })

//     web3.eth
//       .sendTransaction({
//         from: this.state.selectedAccount,
//         to: this.props.address,
//         value: this.state.amount * 1e18 // ETH -> Wei
//       })
//       .once('transactionHash', transactionHash => {
//         this.setState({
//           transactionHash,
//           message: { text: alertMessages().waitingConfirmation }
//         })
//       })
//       .on('error', error =>
//         this.setState({
//           message: { status: 'error', text: error.message }
//         })
//       )
//       .then(() => {
//         this.setState({
//           message: {
//             status: 'success',
//             text: alertMessages().success
//           }
//         })
//       })
//   }
