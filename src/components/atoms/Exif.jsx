import React from 'react'
import PropTypes from 'prop-types'
import styles from './Exif.module.scss'

const getFraction = decimal => {
  for (var denominator = 1; (decimal * denominator) % 1 !== 0; denominator++);
  return { numerator: decimal * denominator, denominator: denominator }
}

const ExposureFormatted = ({ exposure }) => {
  const exposureShortened = exposure.toFixed(0)

  if (exposureShortened === 0) {
    return `+/- ${exposureShortened}`
  } else if (exposureShortened > 0) {
    return `+ ${exposureShortened}`
  } else {
    return exposureShortened
  }
}

const Exif = ({ exif }) => {
  const { iso, model, fstop, shutterspeed, focalLength, exposure } = exif

  return (
    <aside className={styles.exif}>
      {model && (
        <span className="exif__model" title="Camera model">
          {model}
        </span>
      )}

      {fstop && (
        <span className="exif__fstop" title="Aperture">
          {`ƒ ${fstop}`}
        </span>
      )}

      {shutterspeed && (
        <span className="exif__shutterspeed" title="Shutter speed">
          {`${getFraction(shutterspeed).numerator}/${
            getFraction(shutterspeed).denominator
          }s`}
        </span>
      )}

      {exposure && (
        <span className="exif__exposure" title="Exposure">
          <ExposureFormatted exposure={exposure} />
        </span>
      )}

      {iso && (
        <span className="exif__iso" title="ISO">
          {`ISO ${iso}`}
        </span>
      )}

      {focalLength && (
        <span className="exif__focallength" title="Focal length">
          {`${focalLength}mm`}
        </span>
      )}
    </aside>
  )
}

Exif.propTypes = {
  exif: PropTypes.object
}

export default Exif
