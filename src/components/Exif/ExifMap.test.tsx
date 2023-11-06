import { describe, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ExifMap from './ExifMap'

describe('ExifMap', () => {
  it('renders without crashing', async () => {
    render(
      <>
        <input id="toggle" data-testid="toggle" type="checkbox" />
        <ExifMap
          gps={{ latitude: 41.89007222222222, longitude: 12.491516666666666 }}
        />
      </>
    )

    await screen.findByText(/wheel to zoom/)

    // Simulate a change event on the checkbox
    fireEvent.change(screen.getByTestId('toggle'), {
      target: { checked: true }
    })
  })
})
