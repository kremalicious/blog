import React from 'react'
import { render, waitFor, fireEvent, screen } from '@testing-library/react'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../../../hooks/useWeb3'

import Web3Donation from '.'

describe('Web3Donation', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3Donation address="xxx" />
      </Web3ReactProvider>
    )
    const lazyElement = await waitFor(() => container.querySelector('button'))
    expect(lazyElement).toBeInTheDocument()

    fireEvent.click(lazyElement)
    const message = await screen.findByText(
      /No Ethereum browser extension detected/
    )
    expect(message).toBeInTheDocument()
  })
})
