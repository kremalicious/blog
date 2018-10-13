import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Web3 from 'web3'
import Input from '../atoms/Input'
import styles from './Web3Donation.module.scss'

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60

const InputGroup = ({
  networkId,
  selectedAccount,
  amount,
  onAmountChange,
  handleWeb3Button
}) => (
  <div className={styles.inputGroup}>
    <div className={styles.input}>
      <Input
        type="number"
        disabled={!(networkId === '1') || !selectedAccount}
        value={amount}
        onChange={onAmountChange}
        min="0"
        step="0.01"
      />
      <div className={styles.currency}>
        <span>ETH</span>
      </div>
    </div>
    <button
      className="btn btn-primary"
      onClick={handleWeb3Button}
      disabled={!(networkId === '1') || !selectedAccount}
    >
      Make it rain
    </button>
  </div>
)

InputGroup.propTypes = {
  networkId: PropTypes.string,
  selectedAccount: PropTypes.string,
  amount: PropTypes.number,
  onAmountChange: PropTypes.func,
  handleWeb3Button: PropTypes.func
}

const Alerts = ({ accounts, networkId, error, transactionHash }) => {
  if (error || accounts.length === 0) {
    return (
      <div className={styles.alert}>
        {accounts.length === 0 &&
          'Web3 detected, but no account. Are you logged into your MetaMask account?'}
        {networkId !== '1' && 'Please connect to Main network'}
        {error && error.message}
      </div>
    )
  }

  if (transactionHash) {
    return (
      <div className={styles.success}>
        You are awesome, thanks!
        <br />
        <a href={`https://etherscan.io/tx/${transactionHash}`}>
          See your transaction on etherscan.io.
        </a>
      </div>
    )
  }

  return null
}

Alerts.propTypes = {
  accounts: PropTypes.array,
  networkId: PropTypes.string,
  error: PropTypes.object,
  transactionHash: PropTypes.string
}

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
        <header>
          <h4>web3</h4>
          <p>Send Ether with MetaMask, Brave, or Mist.</p>
        </header>

        {this.state.web3Connected ? (
          <div className={styles.web3Row}>
            {this.state.loading ? (
              'Hang on...'
            ) : (
              <InputGroup
                networkId={this.state.networkId}
                selectedAccount={this.state.selectedAccount}
                amount={this.state.amount}
                onAmountChange={this.onAmountChange}
                handleWeb3Button={this.handleWeb3Button}
              />
            )}

            <Alerts
              accounts={this.state.accounts}
              networkId={this.state.networkId}
              error={this.state.error}
              transactionHash={this.state.transactionHash}
            />
          </div>
        ) : (
          <small>
            No Web3 detected. Install <a href="https://metamask.io">MetaMask</a>
            , <a href="https://brave.com">Brave</a>, or{' '}
            <a href="https://github.com/ethereum/mist">Mist</a>.
          </small>
        )}
      </div>
    )
  }
}
