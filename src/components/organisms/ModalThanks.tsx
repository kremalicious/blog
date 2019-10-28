import React, { lazy, Suspense } from 'react'
import shortid from 'shortid'
import { Author } from '../../@types/Site'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

import Modal from '../atoms/Modal'
import styles from './ModalThanks.module.scss'

const Web3Donation = lazy(() => import('../molecules/Web3Donation'))
const Qr = lazy(() => import('../atoms/Qr'))

const Coin = ({ address, author }: { address: string; author: Author }) => (
  <div className={styles.coin}>
    <Suspense fallback={<div>Loading...</div>}>
      <Qr title={address} address={(author as any)[address]} />
    </Suspense>
  </div>
)

export default function ModalThanks(props: any) {
  const { author } = useSiteMetadata()
  const coins = Object.keys(author).filter(
    key => key === 'bitcoin' || key === 'ether'
  )

  return (
    <Modal
      {...props}
      contentLabel="Say thanks with Bitcoin or Ether"
      title="Say thanks"
    >
      <div className={styles.modalThanks}>
        <Suspense fallback={<div>Loading...</div>}>
          <Web3Donation address={author.ether} />
        </Suspense>

        <header>
          <h4>Any other wallets</h4>
          <p>Send Bitcoin or Ether from any wallet.</p>
        </header>

        {coins.map((address: string) => (
          <Coin key={shortid.generate()} address={address} author={author} />
        ))}
      </div>
    </Modal>
  )
}
