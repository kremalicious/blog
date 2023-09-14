import { type ReactElement, useState, useEffect } from 'react'
import { Map, Marker } from 'pigeon-maps'

const mapbox =
  (mapboxId: string) => (x: string, y: string, z: string, dpr: number) =>
    `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${
      dpr >= 2 ? '@2x' : ''
    }?access_token=${import.meta.env.PUBLIC_MAPBOX_ACCESS_TOKEN}`

const providers = {
  light: mapbox('light-v10'),
  dark: mapbox('dark-v10')
}

type Theme = 'light' | 'dark'

export default function ExifMap({
  gps
}: {
  gps: { latitude: number; longitude: number }
}): ReactElement {
  const theme = document?.documentElement?.getAttribute('data-theme') as Theme

  const [zoom, setZoom] = useState(12)
  const [provider, setProvider] = useState(() => providers[theme || 'dark'])

  function handleThemeChange() {
    const theme = document.documentElement.getAttribute('data-theme') as Theme
    setProvider(() => providers[theme])
  }

  useEffect(() => {
    if (!window) return

    const toggle = document.querySelector('#toggle') as HTMLInputElement
    toggle.addEventListener('change', handleThemeChange)
    return () => toggle.removeEventListener('change', handleThemeChange)
  }, [])

  const zoomIn = () => setZoom(Math.min(zoom + 4, 20))
  const { latitude, longitude } = gps

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
