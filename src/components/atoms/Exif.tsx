import React, { ReactElement } from 'react'
import ExifMap from './ExifMap'
import { exif as styleExif, data, map } from './Exif.module.css'
import { Exif as ExifMeta } from '../../@types/Image'
import Icon from './Icon'

const ExifData = ({
  title,
  value,
  icon
}: {
  title: string
  value: string
  icon: string
}) => (
  <span title={title}>
    <Icon name={icon} />
    {value}
  </span>
)

export default function Exif({ exif }: { exif: ExifMeta }): ReactElement {
  const { iso, model, fstop, shutterspeed, focalLength, exposure, gps } =
    exif.formatted

  return (
    <aside className={styleExif}>
      <div className={data}>
        {model && <ExifData title="Camera model" value={model} icon="Camera" />}
        {focalLength && (
          <ExifData title="Focal length" value={focalLength} icon="Crosshair" />
        )}
        {fstop && <ExifData title="Aperture" value={fstop} icon="Aperture" />}
        {shutterspeed && (
          <ExifData
            title="Shutter speed"
            value={shutterspeed}
            icon="Stopwatch"
          />
        )}
        {exposure && <ExifData title="Exposure" value={exposure} icon="Sun" />}
        {iso && <ExifData title="ISO" value={iso} icon="Maximize" />}
      </div>
      {gps && gps.latitude && (
        <div className={map}>
          <ExifMap gps={gps} />
        </div>
      )}
    </aside>
  )
}
