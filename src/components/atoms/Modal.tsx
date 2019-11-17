import React from 'react'
import ReactModal from 'react-modal'
import Icon from './Icon'
import styles from './Modal.module.scss'

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#___gatsby')

export default function Modal({
  title,
  isOpen,
  handleCloseModal,
  children,
  ...props
}: {
  title?: string
  isOpen?: boolean
  handleCloseModal(): void
  children: any
}) {
  if (!isOpen) return null

  return (
    <ReactModal
      overlayClassName={styles.modal}
      className={styles.modalContent}
      htmlOpenClassName={styles.isModalOpen}
      shouldReturnFocusAfterClose={false}
      isOpen={isOpen}
      {...props}
    >
      {title && <h1 className={styles.modalTitle}>{title}</h1>}
      {children}
      <button className={styles.modalClose} onClick={handleCloseModal}>
        <Icon name="X" />
      </button>
    </ReactModal>
  )
}
