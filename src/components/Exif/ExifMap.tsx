import type { Gps } from '@/lib/exif'
import { Marker, Map as PigeonMap } from 'pigeon-maps'
import { type ReactElement, useEffect, useState } from 'react'

const mapbox =
  (mapboxId: string) =>
  (x: number, y: number, z: number, dpr: number | undefined) =>
    `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${
      dpr && dpr >= 2 ? '@2x' : ''
    }?access_token=${import.meta.env.PUBLIC_MAPBOX_ACCESS_TOKEN}`

const providers = {
  light: mapbox('light-v10'),
  dark: mapbox('dark-v10')
}

type Theme = 'light' | 'dark'

export default function ExifMap({ gps }: { gps: Gps }): ReactElement {
  const theme = document?.documentElement?.getAttribute('data-theme') as Theme

  const [zoom, setZoom] = useState(12)
  const [provider, setProvider] = useState(() => providers[theme || 'dark'])

  function handleThemeChange() {
    const theme = document.documentElement.getAttribute('data-theme') as Theme
    setProvider(() => providers[theme])
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: handleThemeChange not needed in deps
  useEffect(() => {
    if (!window) return

    const toggle = document.querySelector('#toggle') as HTMLInputElement
    toggle.addEventListener('change', handleThemeChange)
    return () => toggle.removeEventListener('change', handleThemeChange)
  }, [])

  const zoomIn = () => setZoom(Math.min(zoom + 4, 20))
  const { latitude, longitude } = gps

  return (
    <PigeonMap
      center={[latitude, longitude]}
      zoom={zoom}
      height={220}
      dprs={[1, 2]}
      attribution={false}
      provider={provider}
      metaWheelZoom={true}
      metaWheelZoomWarning={'META+wheel to zoom'}
    >
      <Marker anchor={[latitude, longitude]} payload={1} onClick={zoomIn} />
    </PigeonMap>
  )
}
