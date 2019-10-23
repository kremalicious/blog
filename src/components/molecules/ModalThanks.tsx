import React from 'react'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

import Web3Donation from '../Web3Donation'
import Qr from '../atoms/Qr'
import Modal from '../atoms/Modal'
import styles from './ModalThanks.module.scss'

export default function ModalThanks(props: any) {
  const { author } = useSiteMetadata()

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

        {Object.keys(author)
          .filter(key => key === 'bitcoin' || key === 'ether')
          .map((address: string, i: number) => (
            <div key={i} className={styles.coin}>
              <Qr title={address} address={(author as any)[address]} />
            </div>
          ))}
      </div>
    </Modal>
  )
}
