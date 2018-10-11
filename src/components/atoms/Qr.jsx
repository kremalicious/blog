import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { QRCode } from 'react-qr-svg'
import Clipboard from 'react-clipboard.js'
import { ReactComponent as IconClipboard } from '../../images/clipboard.svg'

const Qr = ({ address, title }) => (
  <Fragment>
    {title && <h4>{title}</h4>}
    <QRCode
      bgColor="transparent"
      fgColor="#6b7f88"
      level="Q"
      style={{ width: 120 }}
      value={address}
    />
    <pre>
      <code>{address}</code>
      <Clipboard data-clipboard-text={address} button-title="Copy to clipboard">
        <IconClipboard />
      </Clipboard>
    </pre>
  </Fragment>
)

Qr.propTypes = {
  address: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default Qr
