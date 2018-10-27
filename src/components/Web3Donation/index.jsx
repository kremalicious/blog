import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import InputGroup from './InputGroup'
import Alerts from './Alerts'
import styles from './index.module.scss'
import { getWeb3, getAccounts, getNetwork } from './utils'

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60

export default class Web3Donation extends PureComponent {
  state = {
    web3Connected: false,
    netId: null,
    networkName: null,
    isCorrectNetwork: false,
    loading: true,
    accounts: [],
    selectedAccount: null,
    amount: '0.01',
    transactionHash: null,
    receipt: null,
    inTransaction: false,
    error: null,
    message: 'Hang on...'
  }

  static propTypes = {
    address: PropTypes.string
  }

  web3 = null
  interval = null
  networkInterval = null

  componentDidMount() {
    this.initWeb3()
  }

  componentWillUnmount() {
    this.resetAllTheThings()
  }

  initWeb3 = async () => {
    try {
      this.web3 = await getWeb3()

      this.setState({ web3Connected: this.web3 ? true : false })
      this.web3 ? this.initAllTheTings() : this.setState({ loading: false })
    } catch (error) {
      this.setState({ error })
      this.setState({ web3Connected: false })
    }
  }

  async initAllTheTings() {
    await this.fetchAccounts()
    await this.fetchNetwork()

    this.setState({ loading: false })

    this.initAccountsPoll()
    this.initNetworkPoll()
  }

  resetAllTheThings() {
    clearInterval(this.interval)
    clearInterval(this.networkInterval)
    this.setState({ web3Connected: false })
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

    try {
      const { netId, networkName } = await getNetwork(web3)

      this.setState({
        error: null,
        netId,
        networkName,
        isCorrectNetwork: netId === 1
      })
    } catch (error) {
      this.setState({ error })
    }
  }

  fetchAccounts = async () => {
    const { web3 } = this

    try {
      const accounts = await getAccounts(web3)

      this.setState({
        error: null,
        accounts,
        selectedAccount: accounts[0] ? accounts[0].toLowerCase() : null
      })
    } catch (error) {
      this.setState({ error })
    }
  }

  sendTransaction() {
    const { web3 } = this

    web3.eth
      .sendTransaction({
        from: this.state.selectedAccount,
        to: this.props.address,
        value: this.state.amount * 1e18 // ETH -> Wei
      })
      .once('transactionHash', transactionHash => {
        this.setState({
          transactionHash,
          message: 'Waiting for network confirmation, hang on...'
        })
      })
      .on('error', error => this.setState({ error, inTransaction: false }))
      .then(() => {
        this.setState({ message: 'Confirmed. You are awesome, thanks!' })
      })
  }

  handleButton = () => {
    this.setState({
      inTransaction: true,
      message: 'Waiting for your confirmation...'
    })

    this.sendTransaction()
  }

  onAmountChange = ({ target }) => {
    this.setState({ amount: target.value })
  }

  render() {
    const {
      isCorrectNetwork,
      accounts,
      selectedAccount,
      web3Connected,
      inTransaction,
      loading,
      amount,
      networkName,
      error,
      transactionHash,
      confirmationNumber,
      message
    } = this.state

    const hasAccount = accounts.length !== 0

    return (
      <div className={styles.web3}>
        <header>
          <h4>web3</h4>
          <p>Send Ether with MetaMask, Brave, or Mist.</p>
        </header>

        <div className={styles.web3Row}>
          {loading ? (
            <div className={styles.message}>Checking...</div>
          ) : (
            web3Connected && (
              <InputGroup
                hasCorrectNetwork={isCorrectNetwork}
                hasAccount={hasAccount}
                selectedAccount={selectedAccount}
                amount={amount}
                onAmountChange={this.onAmountChange}
                handleButton={this.handleButton}
                inTransaction={inTransaction}
                message={message}
              />
            )
          )}
        </div>

        {!loading && (
          <Alerts
            hasCorrectNetwork={isCorrectNetwork}
            hasAccount={hasAccount}
            networkName={networkName}
            error={error}
            transactionHash={transactionHash}
            web3Connected={web3Connected}
            confirmationNumber={confirmationNumber}
          />
        )}
      </div>
    )
  }
}
