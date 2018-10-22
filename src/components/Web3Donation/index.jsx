import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Web3 from 'web3'
import InputGroup from './InputGroup'
import Alerts from './Alerts'
import styles from './index.module.scss'
import { getNetworkName, Logger } from './utils'

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60

export default class Web3Donation extends PureComponent {
  state = {
    web3Connected: false,
    networkId: null,
    networkName: null,
    accounts: [],
    selectedAccount: null,
    amount: '0.01',
    transactionHash: null,
    loading: false,
    error: null
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

  async initWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum)

      try {
        // Request account access
        await window.ethereum.enable()
        this.setState({ web3Connected: true })

        this.initAllTheTings()
      } catch (error) {
        // User denied account access...
        Logger.error(error)
        this.setState({ error })
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // this.web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546')
      this.web3 = new Web3(window.web3.currentProvider)
      this.setState({ web3Connected: true })

      this.initAllTheTings()
    }
    // Non-dapp browsers...
    else {
      this.setState({ web3Connected: false })
    }
  }

  initAllTheTings() {
    this.fetchAccounts()
    this.fetchNetwork()
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

  fetchNetwork = () => {
    const { web3 } = this

    web3 &&
      web3.eth &&
      //web3.eth.net.getId((err, netId) => {
      web3.version.getNetwork((err, netId) => {
        if (err) this.setState({ error: err })

        if (netId != this.state.networkId) {
          this.setState({
            error: null,
            networkId: netId
          })

          getNetworkName(netId).then(networkName => {
            this.setState({ networkName })
          })
        }
      })
  }

  fetchAccounts = () => {
    const { web3 } = this

    web3 &&
      web3.eth &&
      web3.eth.getAccounts((err, accounts) => {
        if (err) this.setState({ error: err })

        this.setState({
          error: null,
          accounts,
          selectedAccount: accounts[0]
        })
      })
  }

  handleButton = () => {
    const { web3 } = this

    this.setState({ loading: true })

    // web3.eth
    //   .sendTransaction({
    //     from: this.state.selectedAccount,
    //     to: this.props.address,
    //     value: '10000000000000000'
    //   })
    //   .then(receipt => {
    //     this.setState({ receipt, loading: false })
    //   })
    //   .catch(error => {
    //     this.setState({ error, loading: false })
    //   })

    web3.eth.sendTransaction(
      {
        from: this.state.selectedAccount,
        to: this.props.address,
        value: this.state.amount * 1e18 // ETH -> Wei
      },
      (error, transactionHash) => {
        if (error) this.setState({ error, loading: false })
        if (!transactionHash) this.setState({ loading: true })
        this.setState({ transactionHash, loading: false })
      }
    )
  }

  onAmountChange = ({ target }) => {
    this.setState({ amount: target.value })
  }

  render() {
    const {
      networkId,
      accounts,
      selectedAccount,
      web3Connected,
      loading,
      amount,
      networkName,
      error,
      transactionHash
    } = this.state

    const hasCorrectNetwork = networkId === '1'
    const hasAccount = accounts.length !== 0

    return (
      <div className={styles.web3}>
        <header>
          <h4>web3</h4>
          <p>Send Ether with MetaMask, Brave, or Mist.</p>
        </header>

        {web3Connected && (
          <div className={styles.web3Row}>
            {loading ? (
              'Hang on...'
            ) : (
              <InputGroup
                hasCorrectNetwork={hasCorrectNetwork}
                hasAccount={hasAccount}
                selectedAccount={selectedAccount}
                amount={amount}
                onAmountChange={this.onAmountChange}
                handleButton={this.handleButton}
              />
            )}
          </div>
        )}

        <Alerts
          hasCorrectNetwork={hasCorrectNetwork}
          hasAccount={hasAccount}
          networkName={networkName}
          error={error}
          transactionHash={transactionHash}
          web3Connected={web3Connected}
        />
      </div>
    )
  }
}
