import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Web3 from 'web3'
import styles from './Web3Donation.module.scss'

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60

export default class Web3Donation extends PureComponent {
  state = {
    web3Connected: false,
    networkError: null,
    networkId: null,
    accounts: [],
    selectedAccount: null,
    receipt: '',
    loading: false,
    error: null
  }

  static propTypes = {
    address: PropTypes.string
  }

  web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546')
  interval = null
  networkInterval = null

  componentDidMount() {
    const { web3 } = this

    if (web3 && web3.eth) {
      this.setState({ web3Connected: true })

      this.fetchAccounts()
      this.fetchNetwork()
      this.initPoll()
      this.initNetworkPoll()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    clearInterval(this.networkInterval)
    this.setState({ web3Connected: false })
  }

  initPoll() {
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
      web3.eth.net.getId((err, netId) => {
        if (err) {
          this.setState({
            networkError: err
          })
        } else {
          if (netId != this.state.networkId) {
            this.setState({
              networkError: null,
              networkId: netId
            })
          }
        }
      })
  }

  fetchAccounts = () => {
    const { web3 } = this

    web3 &&
      web3.eth &&
      web3.eth.getAccounts((err, accounts) => {
        if (err) {
          this.setState({
            accountsError: err
          })
        } else {
          this.setState({
            accounts,
            selectedAccount: accounts[0]
          })
        }
      })
  }

  handleWeb3Button = () => {
    const { web3 } = this

    this.setState({ loading: true })

    web3.eth
      .sendTransaction({
        from: this.state.selectedAccount,
        to: this.props.address,
        value: '10000000000000000'
      })
      .then(receipt => {
        this.setState({ receipt, loading: false })
      })
      .catch(error => {
        this.setState({ error, loading: false })
      })
  }

  render() {
    if (this.state.web3Connected) {
      return (
        <div className={styles.web3}>
          <h4>web3</h4>
          <p>Send a donation with your MetaMask or Mist account.</p>

          {this.state.web3Connected && (
            <div>
              {this.state.loading ? (
                'Hang on...'
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={this.handleWeb3Button}
                  disabled={
                    !(this.state.networkId === 1) || !this.state.selectedAccount
                  }
                >
                  Make it rain 0.01 Ξ
                </button>
              )}

              {this.state.accounts.length === 0 && (
                <div className={styles.alert}>
                  Web3 detected, but no account. Are you logged into your
                  MetaMask account?
                </div>
              )}

              {this.state.networkId !== 1 && (
                <div className={styles.alert}>
                  Please connect to Main network
                </div>
              )}

              {this.state.error && (
                <div className={styles.alert}>{this.state.error.message}</div>
              )}

              {this.state.receipt.status && (
                <div className={styles.success}>
                  You are awesome, thanks!
                  <br />
                  <a
                    href={`https://etherscan.io/tx/${
                      this.state.receipt.transactionHash
                    }`}
                  >
                    See your transaction on etherscan.io.
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )
    } else {
      return null
    }
  }
}
