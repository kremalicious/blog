import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../../../hooks/use-web3'

import Web3Donation from '.'

describe('Web3Donation', () => {
  it('renders without crashing', async () => {
    const { container, getByText } = render(
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3Donation address="xxx" />
      </Web3ReactProvider>
    )
    const lazyElement = await waitForElement(() =>
      container.querySelector('button')
    )
    expect(lazyElement).toBeInTheDocument()

    fireEvent.click(lazyElement)
    const message = await waitForElement(() =>
      getByText(/No Ethereum browser extension detected/)
    )
    expect(message).toBeInTheDocument()
  })
})
