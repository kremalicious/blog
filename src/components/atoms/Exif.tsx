import React from 'react'
import ExifMap from './ExifMap'
import styles from './Exif.module.scss'
import { Exif as ExifMeta } from '../../@types/Post'

export default function Exif({ exif }: { exif: ExifMeta }) {
  const { iso, model, fstop, shutterspeed, focalLength, exposure, gps } = exif

  return (
    <aside className={styles.exif}>
      <div className={styles.data}>
        {model && <span title="Camera model">{model}</span>}
        {focalLength && <span title="Focal length">{focalLength}</span>}
        {fstop && <span title="Aperture">{fstop}</span>}
        {shutterspeed && <span title="Shutter speed">{shutterspeed}</span>}
        {exposure && <span title="Exposure">{exposure}</span>}
        {iso && <span title="ISO">{iso}</span>}
      </div>
      {gps.latitude && (
        <div className={styles.map}>
          <ExifMap gps={gps} />
        </div>
      )}
    </aside>
  )
}
