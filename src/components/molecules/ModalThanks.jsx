import React, { PureComponent } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { QRCode } from 'react-qr-svg'
import Clipboard from 'react-clipboard.js'
import Web3Donation from '../atoms/Web3Donation'
import Modal from '../atoms/Modal'
import { ReactComponent as IconClipboard } from '../../images/clipboard.svg'
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

                {Object.keys(author).map((address, i) => (
                  <div key={i} className={styles.coin}>
                    <h4>{address}</h4>
                    <QRCode
                      bgColor="transparent"
                      fgColor="#6b7f88"
                      level="Q"
                      style={{ width: 120 }}
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
  }
}

export default ModalThanks
