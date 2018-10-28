import React from 'react'
import PropTypes from 'prop-types'
import { QRCode } from 'react-qr-svg'
import Clipboard from 'react-clipboard.js'
import { ReactComponent as IconClipboard } from '../../images/clipboard.svg'

import styles from './Qr.module.scss'

const onCopySuccess = e => {
  e.trigger.classList.add(styles.copied)
}

const Qr = ({ address, title }) => (
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

Qr.propTypes = {
  address: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default Qr
