import React, { useState } from 'react'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import useDarkMode from 'use-dark-mode'

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia3JlbWFsaWNpb3VzIiwiYSI6ImNqbTE2NHpkYjJmNm8zcHF4eDVqZzk3ejEifQ.1uwPzM6MSTgL2e1Hxcmuqw'

const mapbox = (mapboxId: string, accessToken: string) => (
  x: string,
  y: string,
  z: string,
  dpr?: number
) =>
  `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${
    dpr >= 2 ? '@2x' : ''
  }?access_token=${accessToken}`

const providers = {
  light: mapbox('light-v10', MAPBOX_ACCESS_TOKEN),
  dark: mapbox('dark-v10', MAPBOX_ACCESS_TOKEN)
}

export default function ExifMap({
  gps
}: {
  gps: { latitude: string; longitude: string }
}) {
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
