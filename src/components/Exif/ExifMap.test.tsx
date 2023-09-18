import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ExifMap from './ExifMap'

describe('ExifMap', () => {
  it('renders without crashing', async () => {
    render(
      <html data-theme="dark">
        <body>
          <input id="toggle" type="checkbox" />
          <ExifMap
            gps={{ latitude: 41.89007222222222, longitude: 12.491516666666666 }}
          />
        </body>
      </html>
    )

    await screen.findByText(/wheel to zoom/)
  })
})
