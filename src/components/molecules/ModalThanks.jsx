import React, { PureComponent } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { QRCode } from 'react-qr-svg'
import Clipboard from 'react-clipboard.js'
import Web3 from 'web3'

import Modal from '../atoms/Modal'
import { ReactComponent as IconClipboard } from '../../images/clipboard.svg'
import styles from './ModalThanks.module.scss'

const query = graphql`
  query {
    site {
      siteMetadata {
        author {
          bitcoin
          ether
        }
      }
    }
  }
`

class ModalThanks extends PureComponent {
  state = {
    minimal: false,
    web3Connected: false,
    balance: '',
    network: '',
    accounts: [],
    receipt: ''
  }

  web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546')

  componentDidMount() {
    this.getWeb3Account()
  }

  getWeb3Account() {
    if (this.web3 && this.web3.eth.net.isListening()) {
      this.setState({ web3Connected: true })

      this.web3.eth.net.getId((err, netId) => {
        switch (netId) {
          case '1':
            this.setState({ network: 'Main' })
            break
          case '2':
            this.setState({ network: 'Morden' })
            break
          case '3':
            this.setState({ network: 'Ropsten' })
            break
          case '4':
            this.setState({ network: 'Rinkeby' })
            break
          case '42':
            this.setState({ network: 'Kovan' })
            break
          default:
            this.setState({ network: 'unknown' })
        }
      })

      this.web3.eth.getAccounts((error, accounts) => {
        this.setState({ accounts })
        this.web3.eth.getBalance(accounts[0]).then(balance => {
          this.setState({ balance })
        })
      })
    }
  }

  handleWeb3Button = () => {
    this.web3.eth
      .sendTransaction({
        from: this.state.accounts[0],
        to: '0x339dbC44d39bf1961E385ed0Ae88FC6069b87Ea1',
        value: '1000000000000000'
      })
      .then(receipt => this.setState({ receipt }))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { author } = data.site.siteMetadata

          return (
            <Modal
              {...this.props}
              contentLabel="Say thanks with Bitcoin or Ether"
              title="Say thanks"
            >
              <div className={styles.modalThanks}>
                {this.state.web3Connected && (
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={this.handleWeb3Button}
                    >
                      Make it rain
                    </button>
                    {this.state.receipt.status && (
                      <div>{this.state.receipt.transactionHash}</div>
                    )}
                  </div>
                )}

                {Object.keys(author).map((address, i) => (
                  <div key={i} className={styles.coin}>
                    <h4>{address}</h4>
                    <QRCode
                      bgColor="transparent"
                      fgColor="#6b7f88"
                      level="Q"
                      style={{ width: 150 }}
                      value={author[address]}
                    />
                    <pre>
                      <code>{author[address]}</code>
                      <Clipboard
                        data-clipboard-text={author[address]}
                        button-title="Copy to clipboard"
                      >
                        <IconClipboard />
                      </Clipboard>
                    </pre>
                  </div>
                ))}
              </div>
            </Modal>
          )
        }}
      />
    )
  }
}

export default ModalThanks
