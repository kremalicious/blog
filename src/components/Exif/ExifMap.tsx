import { type ReactElement, useState } from 'react'
import { Map, Marker } from 'pigeon-maps'
import { useStore } from '@nanostores/react'
import { $theme as themeStore } from '@stores/theme'

const mapbox =
  (mapboxId: string) => (x: string, y: string, z: string, dpr: number) =>
    `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${
      dpr >= 2 ? '@2x' : ''
    }?access_token=${import.meta.env.PUBLIC_MAPBOX_ACCESS_TOKEN}`

const providers = {
  light: mapbox('light-v10'),
  dark: mapbox('dark-v10')
}

export default function ExifMap({
  gps
}: {
  gps: { latitude: number; longitude: number }
}): ReactElement {
  const $theme = useStore(themeStore)
  const [zoom, setZoom] = useState(12)

  const zoomIn = () => {
    setZoom(Math.min(zoom + 4, 20))
  }

  const { latitude, longitude } = gps
  const provider = providers[$theme]

  return (
    <Map
      center={[latitude, longitude]}
      zoom={zoom}
      height={220}
      dprs={[1, 2]}
      attribution={false}
      provider={provider as any}
      metaWheelZoom={true}
      metaWheelZoomWarning={'META+wheel to zoom'}
    >
      <Marker anchor={[latitude, longitude]} payload={1} onClick={zoomIn} />
    </Map>
  )
}
