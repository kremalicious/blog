import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ModalThanks from '../molecules/ModalThanks'
import styles from './PostActions.module.scss'

import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'

export default class PostActions extends PureComponent {
  state = {
    showModal: false
  }

  static propTypes = {
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { url, slug, githubLink } = this.props

    return (
      <aside className={styles.actions}>
        <div>
          <a
            className={styles.action}
            href={`https://twitter.com/intent/tweet?text=@kremalicious&url=${url}${slug}`}
          >
            <Twitter />
            <h1 className={styles.actionTitle}>Have a comment?</h1>
            <p className={styles.actionText}>
              Hit me up on Twitter{' '}
              <span className={styles.link}>@kremalicious</span>.
            </p>
          </a>
        </div>

        <div>
          <button className={styles.action} onClick={this.toggleModal}>
            <Bitcoin />
            <h1 className={styles.actionTitle}>Found something useful?</h1>
            <p className={styles.actionText}>
              Say thanks{' '}
              <span className={styles.link}>with Bitcoins or Ether</span>.
            </p>
          </button>
        </div>

        <div>
          <a className={styles.action} href={githubLink}>
            <GitHub />
            <h1 className={styles.actionTitle}>Edit on GitHub</h1>
            <p className={styles.actionText}>
              Contribute to this post on{' '}
              <span className={styles.link}>GitHub</span>.
            </p>
          </a>
        </div>

        {this.state.showModal && (
          <ModalThanks
            isOpen={this.state.showModal}
            handleCloseModal={this.toggleModal}
          />
        )}
      </aside>
    )
  }
}
