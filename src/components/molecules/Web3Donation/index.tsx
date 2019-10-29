import React, { PureComponent } from 'react'
import Web3 from 'web3'
import InputGroup from './InputGroup'
import Alerts, { alertMessages } from './Alerts'
import styles from './index.module.scss'
import { getWeb3, getAccounts, getNetwork } from './utils'

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60
const correctNetwork = 1

interface Web3DonationState {
  netId: number
  networkName: string
  accounts: string[]
  selectedAccount: string
  amount: number
  transactionHash: string
  receipt: string
  message: {
    status?: string
    text?: string
  }
  inTransaction: boolean
}

export default class Web3Donation extends PureComponent<
  { address: string },
  Web3DonationState
> {
  state = {
    netId: 0,
    networkName: '',
    accounts: [''],
    selectedAccount: '',
    amount: 0.01,
    transactionHash: '',
    receipt: '',
    message: {},
    inTransaction: false
  }

  web3: Web3 = null
  interval: any = null
  networkInterval: any = null

  componentDidMount() {
    this.initWeb3()
  }

  componentWillUnmount() {
    this.resetAllTheThings()
  }

  initWeb3 = async () => {
    this.setState({ message: { text: 'Checking' } })

    try {
      this.web3 = await getWeb3()

      this.web3
        ? this.initAllTheTings()
        : this.setState({
            message: {
              status: 'error',
              text: alertMessages().noWeb3
            }
          })
    } catch (error) {
      this.setState({
        message: { status: 'error', text: error }
      })
    }
  }

  async initAllTheTings() {
    this.fetchAccounts()
    this.fetchNetwork()

    this.initAccountsPoll()
    this.initNetworkPoll()
  }

  resetAllTheThings() {
    clearInterval(this.interval)
    clearInterval(this.networkInterval)
  }

  initAccountsPoll() {
    if (!this.interval) {
      this.interval = setInterval(this.fetchAccounts, ONE_SECOND)
    }
  }

  initNetworkPoll() {
    if (!this.networkInterval) {
      this.networkInterval = setInterval(this.fetchNetwork, ONE_MINUTE)
    }
  }

  fetchNetwork = async () => {
    const { web3 } = this
    const { netId, networkName } = await getNetwork(web3)

    if (netId === correctNetwork) {
      this.setState({ netId, networkName })
    } else {
      this.setState({
        message: {
          status: 'error',
          text: alertMessages(networkName).noCorrectNetwork
        }
      })
    }
  }

  fetchAccounts = async () => {
    const { web3 } = this
    const accounts = await getAccounts(web3)

    if (accounts[0]) {
      this.setState({
        accounts,
        selectedAccount: accounts[0].toLowerCase()
      })
    } else {
      this.setState({
        message: {
          status: 'error',
          text: alertMessages().noAccount
        }
      })
    }
  }

  sendTransaction = () => {
    const { web3 } = this

    this.setState({
      inTransaction: true,
      message: { text: alertMessages().waitingForUser }
    })

    web3.eth
      .sendTransaction({
        from: this.state.selectedAccount,
        to: this.props.address,
        value: this.state.amount * 1e18 // ETH -> Wei
      })
      .once('transactionHash', transactionHash => {
        this.setState({
          transactionHash,
          message: { text: alertMessages().waitingConfirmation }
        })
      })
      .on('error', error =>
        this.setState({
          message: { status: 'error', text: error.message }
        })
      )
      .then(() => {
        this.setState({
          message: {
            status: 'success',
            text: alertMessages().success
          }
        })
      })
  }

  onAmountChange = ({ target }: { target: any }) => {
    this.setState({ amount: target.value })
  }

  render() {
    const {
      selectedAccount,
      amount,
      transactionHash,
      message,
      inTransaction
    } = this.state

    return (
      <div className={styles.web3}>
        <header>
          <h4>web3</h4>
          <p>Send Ether with MetaMask, Brave, or Mist.</p>
        </header>

        <div className={styles.web3Row}>
          {selectedAccount &&
          this.state.netId === correctNetwork &&
          !inTransaction ? (
            <InputGroup
              selectedAccount={selectedAccount}
              amount={amount}
              onAmountChange={this.onAmountChange}
              sendTransaction={this.sendTransaction}
            />
          ) : (
            message && (
              <Alerts message={message} transactionHash={transactionHash} />
            )
          )}
        </div>
      </div>
    )
  }
}
