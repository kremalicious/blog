import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ExifMap from './ExifMap'
import styles from './Exif.module.scss'

export default class Exif extends PureComponent {
  static propTypes = {
    exif: PropTypes.object
  }

  render() {
    const {
      iso,
      model,
      fstop,
      shutterspeed,
      focalLength,
      exposure,
      gps
    } = this.props.exif

    return (
      <>
        <aside className={styles.exif}>
          <div className={styles.data}>
            {model && <span title="Camera model">{model}</span>}
            {fstop && <span title="Aperture">{fstop}</span>}
            {shutterspeed && <span title="Shutter speed">{shutterspeed}</span>}
            {exposure && <span title="Exposure">{exposure}</span>}
            {iso && <span title="ISO">{iso}</span>}
            {focalLength && <span title="Focal length">{focalLength}</span>}
          </div>
          <div className={styles.map}>{gps && <ExifMap gps={gps} />}</div>
        </aside>
      </>
    )
  }
}
