import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Web3 from 'web3'
import Input from '../atoms/Input'
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
    amount: 0.01,
    receipt: null,
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
    if (typeof window.web3 === 'undefined') {
      // no web3
      this.setState({ web3Connected: false })
    } else {
      // this.web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546')
      this.web3 = new Web3(window.web3.currentProvider)
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
      //web3.eth.net.getId((err, netId) => {
      web3.version.getNetwork((err, netId) => {
        if (err) {
          this.setState({ networkError: err })
        }

        if (netId != this.state.networkId) {
          this.setState({
            networkError: null,
            networkId: netId
          })
        }
      })
  }

  fetchAccounts = () => {
    const { web3 } = this

    web3 &&
      web3.eth &&
      web3.eth.getAccounts((err, accounts) => {
        if (err) {
          this.setState({ accountsError: err })
        }

        this.setState({
          accounts,
          selectedAccount: accounts[0]
        })
      })
  }

  handleWeb3Button = () => {
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
    return (
      <div className={styles.web3}>
        <h4>web3</h4>
        <p>Send Ether with MetaMask, Brave, or Mist.</p>

        {this.state.web3Connected ? (
          <div>
            {this.state.loading ? (
              'Hang on...'
            ) : (
              <div className={styles.inputGroup}>
                <div className={styles.input}>
                  <Input
                    type="number"
                    disabled={
                      !(this.state.networkId === '1') ||
                      !this.state.selectedAccount
                    }
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    min="0"
                    step="0.01"
                  />
                  <div className={styles.currency}>
                    <span>ETH</span>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.handleWeb3Button}
                  disabled={
                    !(this.state.networkId === '1') ||
                    !this.state.selectedAccount
                  }
                >
                  Make it rain
                </button>
              </div>
            )}

            {this.state.accounts.length === 0 && (
              <div className={styles.alert}>
                Web3 detected, but no account. Are you logged into your MetaMask
                account?
              </div>
            )}

            {this.state.networkId !== '1' && (
              <div className={styles.alert}>Please connect to Main network</div>
            )}

            {this.state.error && (
              <div className={styles.alert}>{this.state.error.message}</div>
            )}

            {this.state.transactionHash && (
              <div className={styles.success}>
                You are awesome, thanks!
                <br />
                <a
                  href={`https://etherscan.io/tx/${this.state.transactionHash}`}
                >
                  See your transaction on etherscan.io.
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.alert}>No Web3 capable browser detected.</div>
        )}
      </div>
    )
  }
}
