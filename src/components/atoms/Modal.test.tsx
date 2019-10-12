import React from 'react'
import { render } from '@testing-library/react'
import Modal from './Modal'
import ReactModal from 'react-modal'

describe('Modal', () => {
  it('renders without crashing', () => {
    ReactModal.setAppElement(document.createElement('div'))

    const { rerender } = render(
      <Modal title="Hello" isOpen handleCloseModal={() => null}>
        Hello
      </Modal>
    )
    expect(document.querySelector('.ReactModalPortal')).toBeInTheDocument()

    rerender(
      <Modal isOpen={false} handleCloseModal={() => null}>
        Hello
      </Modal>
    )
  })
})
