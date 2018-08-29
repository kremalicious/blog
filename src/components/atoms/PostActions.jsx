import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ModalThanks from '../molecules/ModalThanks'
import styles from './PostActions.module.scss'

import Twitter from '../svg/Twitter'
import Bitcoin from '../svg/Bitcoin'

class PostActions extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false
    }
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
            <a href="#" onClick={this.toggleModal}>
              with Bitcoins or Ether.
            </a>
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

PostActions.propTypes = {
  slug: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default PostActions
