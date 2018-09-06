import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { QRCode } from 'react-qr-svg'
import Clipboard from 'react-clipboard.js'

import Modal from '../atoms/Modal'
import IconClipboard from '../svg/Clipboard'
import styles from './ModalThanks.module.scss'

const query = graphql`
  query {
    contentYaml {
      author {
        bitcoin
        ether
      }
    }
  }
`

const ModalThanks = ({ ...props }) => (
  <StaticQuery
    query={query}
    render={data => {
      const { author } = data.contentYaml

      return (
        <Modal
          {...props}
          contentLabel="Say thanks with Bitcoin or Ether"
          title="Say thanks"
        >
          <div className={styles.modalThanks}>
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

export default ModalThanks
