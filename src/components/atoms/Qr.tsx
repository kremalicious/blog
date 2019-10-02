import React from 'react'
import { QRCode } from 'react-qr-svg'
import Clipboard from 'react-clipboard.js'
import { ReactComponent as IconClipboard } from '../../images/clipboard.svg'

import styles from './Qr.module.scss'

const onCopySuccess = (e: any) => {
  e.trigger.classList.add(styles.copied)
}

export default function Qr({
  address,
  title
}: {
  address: string
  title?: string
}) {
  return (
    <>
      {title && <h4>{title}</h4>}
      <QRCode
        bgColor="transparent"
        fgColor="#6b7f88"
        level="Q"
        style={{ width: 120 }}
        value={address}
        className={styles.qr}
      />

      <pre className={styles.code}>
        <code>{address}</code>
        <Clipboard
          data-clipboard-text={address}
          button-title="Copy to clipboard"
          onSuccess={e => onCopySuccess(e)}
          className={styles.button}
        >
          <IconClipboard />
        </Clipboard>
      </pre>
    </>
  )
}
