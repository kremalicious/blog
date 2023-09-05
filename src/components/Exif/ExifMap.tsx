import { type ReactElement, useState } from 'react'
import { Map, Marker } from 'pigeon-maps'
import useDarkMode from '@hooks/useDarkMode'

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
  gps: { latitude: string | undefined; longitude: string | undefined }
}): ReactElement {
  const { isDarkMode } = useDarkMode()
  const [zoom, setZoom] = useState(12)

  // useEffect(() => {
  //   const theme = document
  //     .querySelector('html')
  //     ?.attributes.getNamedItem('data-theme')

  //   setIsDarkMode(Boolean(theme?.value === 'dark'))

  //   theme?.addEventListener('change', () => {
  //     setIsDarkMode(Boolean(theme?.value === 'dark'))
  //   })
  // }, [])

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
