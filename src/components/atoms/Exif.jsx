import React, { PureComponent } from 'react'
import EXIF from 'exif-js'
import styles from './Exif.module.scss'

export default class Exif extends PureComponent {
  state = {
    modelvalue: null,
    shutterspeedvalue: null,
    aperturevalue: null,
    exposurevalue: null,
    isovalue: null,
    focallengthvalue: null
  }

  componentDidMount() {
    this.getExif(this.props.image)
  }

  getExif = image => {
    EXIF.getData(image, function() {
      // Get individual data
      const modelvalue = EXIF.getTag(this, 'Model')
      const shutterspeedvalue = EXIF.getTag(this, 'ExposureTime')
      const aperturevalue = EXIF.getTag(this, 'FNumber')
      const exposurevalue = EXIF.getTag(this, 'ExposureBias')
      const isovalue = EXIF.getTag(this, 'ISOSpeedRatings')
      const focallengthvalue = EXIF.getTag(this, 'FocalLength')

      console.log(modelvalue)

      this.setState({
        modelvalue,
        shutterspeedvalue,
        aperturevalue,
        exposurevalue,
        isovalue,
        focallengthvalue
      })
    })
  }

  render() {
    const {
      modelvalue,
      shutterspeedvalue,
      aperturevalue,
      exposurevalue,
      isovalue,
      focallengthvalue
    } = this.state

    return (
      <aside className="exif">
        <span className="exif__model" title="Camera model">
          {modelvalue}
        </span>
        <span className="exif__aperture" title="Aperture" />
        <span className="exif__shutterspeed" title="Shutter speed" />
        <span className="exif__exposure" title="Exposure" />
        <span className="exif__iso" title="ISO" />
        <span className="exif__focallength" title="Focal length" />
      </aside>
    )
  }
}
