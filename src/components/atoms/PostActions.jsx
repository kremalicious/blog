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
        <article className={styles.action}>
          <Twitter />
          <h1 className={styles.actionTitle}>Have a comment?</h1>
          <p className={styles.actionText}>
            Hit me up{' '}
            <a
              href={`https://twitter.com/intent/tweet?text=@kremalicious&url=${url}${slug}`}
            >
              @kremalicious
            </a>
          </p>
        </article>
        <article className={styles.action}>
          <Bitcoin />
          <h1 className={styles.actionTitle}>Found something useful?</h1>
          <p className={styles.actionText}>
            Say thanks{' '}
            <button onClick={this.toggleModal}>with Bitcoins or Ether.</button>
          </p>
        </article>

        <ModalThanks
          isOpen={this.state.showModal}
          handleCloseModal={this.toggleModal}
        />
      </aside>
    )
  }
}
