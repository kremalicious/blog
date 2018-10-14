import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ModalThanks from '../molecules/ModalThanks'
import styles from './PostActions.module.scss'

import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'

export default class PostActions extends PureComponent {
  state = {
    showModal: false
  }

  static propTypes = {
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { url, slug } = this.props

    return (
      <aside className={styles.actions}>
        <a
          className={styles.action}
          href={`https://twitter.com/intent/tweet?text=@kremalicious&url=${url}${slug}`}
        >
          <Twitter />
          <h1 className={styles.actionTitle}>Have a comment?</h1>
          <p className={styles.actionText}>
            Hit me up <span className={styles.link}>@kremalicious</span>.
          </p>
        </a>
        <button className={styles.action} onClick={this.toggleModal}>
          <Bitcoin />
          <h1 className={styles.actionTitle}>Found something useful?</h1>
          <p className={styles.actionText}>
            Say thanks{' '}
            <span className={styles.link}>with Bitcoins or Ether</span>.
          </p>
        </button>

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
