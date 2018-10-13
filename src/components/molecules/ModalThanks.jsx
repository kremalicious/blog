import React, { PureComponent } from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Web3Donation from '../atoms/Web3Donation'
import Qr from '../atoms/Qr'
import Modal from '../atoms/Modal'
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
                <Web3Donation address={author.ether} />

                <header>
                  <h4>Other wallets</h4>
                  <p>Send Bitcoin or Ether from any wallet.</p>
                </header>

                {Object.keys(author).map((address, i) => (
                  <div key={i} className={styles.coin}>
                    <Qr title={address} address={author[address]} />
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
