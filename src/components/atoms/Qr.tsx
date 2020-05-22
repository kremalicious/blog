import React, { ReactElement } from 'react'
import { QRCode } from 'react-qr-svg'
import styles from './Qr.module.scss'
import Copy from './Copy'

export default function Qr({
  address,
  title
}: {
  address: string
  title?: string
}): ReactElement {
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
        <Copy text={address} />
      </pre>
    </>
  )
}
