import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia3JlbWFsaWNpb3VzIiwiYSI6ImNqbTE2NHpkYjJmNm8zcHF4eDVqZzk3ejEifQ.1uwPzM6MSTgL2e1Hxcmuqw'

const retina =
  typeof window !== 'undefined' && window.devicePixelRatio >= 2 ? '@2x' : ''

const mapbox = (mapboxId, accessToken) => (x, y, z) =>
  `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${retina}?access_token=${accessToken}`

const providers = {
  // osm: (x, y, z) => {
  //   const s = String.fromCharCode(97 + ((x + y + z) % 3))
  //   return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
  // },
  // wikimedia: (x, y, z) =>
  //   `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${retina}.png`,
  // stamen: (x, y, z) =>
  //   `https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}${retina}.jpg`,
  // streets: mapbox('streets-v10', MAPBOX_ACCESS_TOKEN),
  // satellite: mapbox('satellite-streets-v10', MAPBOX_ACCESS_TOKEN),
  // outdoors: mapbox('outdoors-v10', MAPBOX_ACCESS_TOKEN),
  light: mapbox('light-v9', MAPBOX_ACCESS_TOKEN),
  dark: mapbox('dark-v9', MAPBOX_ACCESS_TOKEN)
}

export default class ExifMap extends PureComponent {
  state = { zoom: 12 }

  static propTypes = {
    gps: PropTypes.object
  }

  zoomIn = () => {
    this.setState({
      zoom: Math.min(this.state.zoom + 4, 20)
    })
  }

  render() {
    const { latitude, longitude } = this.props.gps

    return (
      <Map
        center={[latitude, longitude]}
        zoom={this.state.zoom}
        height={160}
        attribution={false}
        provider={providers['light']}
        metaWheelZoom={true}
        metaWheelZoomWarning={'META+wheel to zoom'}
      >
        <Marker
          anchor={[latitude, longitude]}
          payload={1}
          onClick={this.zoomIn}
        />
      </Map>
    )
  }
}
