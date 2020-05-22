import React, { ReactElement, useState } from 'react'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import useDarkMode from 'use-dark-mode'

const mapbox = (mapboxId: string) => (
  x: string,
  y: string,
  z: string,
  dpr?: number
) =>
  `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${
    dpr >= 2 ? '@2x' : ''
  }?access_token=${process.env.GATSBY_MAPBOX_ACCESS_TOKEN}`

const providers = {
  light: mapbox('light-v10'),
  dark: mapbox('dark-v10')
}

export default function ExifMap({
  gps
}: {
  gps: { latitude: string; longitude: string }
}): ReactElement {
  const { value } = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })
  const isDarkMode = value
  const [zoom, setZoom] = useState(12)

  const zoomIn = () => {
    setZoom(Math.min(zoom + 4, 20))
  }

  const { latitude, longitude } = gps

  return (
    <Map
      center={[latitude, longitude]}
      zoom={zoom}
      height={220}
      dprs={[1, 2]}
      attribution={false}
      provider={isDarkMode ? providers['dark'] : providers['light']}
      metaWheelZoom={true}
      metaWheelZoomWarning={'META+wheel to zoom'}
    >
      <Marker anchor={[latitude, longitude]} payload={1} onClick={zoomIn} />
    </Map>
  )
}
