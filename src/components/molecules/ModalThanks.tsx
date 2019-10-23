import React, { lazy, Suspense } from 'react'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

import Modal from '../atoms/Modal'
import styles from './ModalThanks.module.scss'

const Web3Donation = lazy(() => import('../Web3Donation'))
const Qr = lazy(() => import('../atoms/Qr'))

export default function ModalThanks(props: any) {
  const { author } = useSiteMetadata()

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

        {Object.keys(author)
          .filter(key => key === 'bitcoin' || key === 'ether')
          .map((address: string, i: number) => (
            <div key={i} className={styles.coin}>
              <Suspense fallback={<div>Loading...</div>}>
                <Qr title={address} address={(author as any)[address]} />
              </Suspense>
            </div>
          ))}
      </div>
    </Modal>
  )
}
