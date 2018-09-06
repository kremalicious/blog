import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import styles from './Modal.module.scss'

ReactModal.setAppElement('#___gatsby')

export default class Modal extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    handleCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }

  render() {
    if (!this.props.isOpen) {
      return null
    }

    const { children, title, handleCloseModal } = this.props

    return (
      <ReactModal
        overlayClassName={styles.modal}
        className={styles.modal__content}
        htmlOpenClassName={styles.isModalOpen}
        shouldReturnFocusAfterClose={false}
        {...this.props}
      >
        {title && <h1 className={styles.modal__title}>{title}</h1>}
        {children}
        <button className={styles.modal__close} onClick={handleCloseModal}>
          &times;
        </button>
      </ReactModal>
    )
  }
}
