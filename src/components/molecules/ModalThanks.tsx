import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Web3Donation from '../Web3Donation'
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

export default function ModalThanks(props: any) {
  const data = useStaticQuery(query)
  const { author } = data.site.siteMetadata

  return (
    <Modal
      {...props}
      contentLabel="Say thanks with Bitcoin or Ether"
      title="Say thanks"
    >
      <div className={styles.modalThanks}>
        <Web3Donation address={author.ether} />

        <header>
          <h4>Any other wallets</h4>
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
}
