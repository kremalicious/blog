import React from 'react'
import PropTypes from 'prop-types'
import styles from './Exif.module.scss'

const Exif = ({ exif }) => {
  const { iso, model, fstop, shutterspeed, focalLength, exposure } = exif

  return (
    <aside className={styles.exif}>
      {model && <span title="Camera model">{model}</span>}
      {fstop && <span title="Aperture">{fstop}</span>}
      {shutterspeed && <span title="Shutter speed">{shutterspeed}</span>}
      {exposure && <span title="Exposure">{exposure}</span>}
      {iso && <span title="ISO">{iso}</span>}
      {focalLength && <span title="Focal length">{focalLength}</span>}
    </aside>
  )
}

Exif.propTypes = {
  exif: PropTypes.object
}

export default Exif
