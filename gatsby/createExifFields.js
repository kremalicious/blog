const fastExif = require('fast-exif')
const Fraction = require('fraction.js')
const dms2dec = require('dms2dec')

exports.createExifFields = async (node, createNodeField) => {
  let exifData
  try {
    exifData = await fastExif.read(node.absolutePath, true)
    if (!exifData) return
    constructExifFields(exifData, createNodeField, node)
  } catch (error) {
    // console.error(`${node.name}: ${error.message}`)
    return null // just silently fail when exif can't be extracted
  }
}

const getGps = gpsData => {
  if (!gpsData) return

  const { GPSLatitudeRef, GPSLatitude, GPSLongitudeRef, GPSLongitude } = gpsData

  const GPSdec = dms2dec(
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef
  )

  const latitude = GPSdec[0]
  const longitude = GPSdec[1]

  return { latitude, longitude }
}

const getExposure = exposureMode => {
  const exposureShortened = parseFloat(exposureMode.toFixed(2))
  let exposure

  if (exposureMode === 0) {
    exposure = `+/- ${exposureShortened} ev`
  } else if (exposureMode > 0) {
    exposure = `+ ${exposureShortened} ev`
  } else {
    exposure = `${exposureShortened} ev`
  }

  return exposure
}

const constructExifFields = (exifData, createNodeField, node) => {
  const { Model } = exifData.image
  const {
    ISO,
    FNumber,
    ExposureTime,
    FocalLength,
    FocalLengthIn35mmFormat,
    ExposureBiasValue,
    ExposureMode,
    LensModel
  } = exifData.exif

  const iso = `ISO ${ISO}`
  const fstop = `ƒ ${FNumber}`
  const focalLength = `${FocalLengthIn35mmFormat || FocalLength}mm`

  // Shutter speed
  const { n, d } = new Fraction(ExposureTime)
  const shutterspeed = `${n}/${d}s`

  // GPS
  let latitude
  let longitude
  if (exifData.gps) ({ latitude, longitude } = getGps(exifData.gps))

  // Exposure
  const exposure = getExposure(ExposureBiasValue || ExposureMode)

  // add exif fields to type File
  createNodeField({
    node,
    name: 'exif',
    value: {
      iso,
      model: Model,
      fstop,
      shutterspeed,
      focalLength,
      lensModel: LensModel,
      exposure,
      gps: { latitude, longitude }
    }
  })
}
