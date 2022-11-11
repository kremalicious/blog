import fs from 'fs'
import util from 'util'
import fastExif from 'fast-exif'
import Fraction from 'fraction.js'
import getCoordinates from 'dms2dec'
import iptc from 'node-iptc'
import type { Actions, NodePluginArgs, Node } from 'gatsby'

const readFile = util.promisify(fs.readFile)

export const createExif = async (
  node: Node,
  actions: Actions,
  createNodeId: NodePluginArgs['createNodeId']
) => {
  try {
    // exif
    const exifData = await fastExif.read(node.absolutePath, true)
    if (!exifData) return

    // iptc
    const file = await readFile(node.absolutePath as string)
    const iptcData = iptc(file)

    createNodes(exifData, iptcData, node, actions, createNodeId)
  } catch (error: any) {
    console.error(`${node.name}: ${error.message}`)
  }
}

function createNodes(
  exifData: Queries.ImageExif,
  iptcData: any,
  node: Node,
  actions: Actions,
  createNodeId: NodePluginArgs['createNodeId']
) {
  const { createNodeField, createNode, createParentChildLink } = actions
  const exifDataFormatted = formatExif(exifData)

  const exif = {
    ...exifData,
    iptc: { ...iptcData },
    formatted: { ...exifDataFormatted }
  }

  const exifNode: any = {
    id: createNodeId(`${node.id} >> ImageExif`),
    children: [],
    ...exif,
    parent: node.id,
    internal: {
      contentDigest: `${node.internal.contentDigest}`,
      type: 'ImageExif'
    }
  }

  // add exif fields to existing type file
  createNodeField({ node, name: 'exif', value: exif })

  // create new nodes from all exif data
  // allowing to be queried with imageExif & AllImageExif
  createNode(exifNode)
  createParentChildLink({ parent: node, child: exifNode })
}

function formatExif(exifData: Queries.ImageExif) {
  if (!exifData.exif) return

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
  const fstop = `ƒ/${FNumber}`
  const focalLength = `${FocalLengthIn35mmFormat || FocalLength}mm`

  // Shutter speed
  const { n, d } = new Fraction(ExposureTime)
  const shutterspeed = `${n}/${d}s`

  // GPS
  let latitude
  let longitude
  if (exifData.gps) ({ latitude, longitude } = formatGps(exifData.gps))

  // Exposure
  const exposure = formatExposure(ExposureBiasValue || ExposureMode)

  return {
    iso,
    model: Model,
    fstop,
    shutterspeed,
    focalLength,
    lensModel: LensModel,
    exposure,
    gps: { latitude, longitude }
  }
}

function formatGps(gpsData: Queries.ImageExif['gps']): {
  latitude: string
  longitude: string
} {
  if (!gpsData) return { latitude: '', longitude: '' }

  const { GPSLatitudeRef, GPSLatitude, GPSLongitudeRef, GPSLongitude } = gpsData

  const GPSdec = getCoordinates(
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef
  )

  const latitude = GPSdec[0]
  const longitude = GPSdec[1]

  return { latitude, longitude }
}

function formatExposure(exposureMode: Queries.ImageExifExif['ExposureMode']) {
  if (exposureMode === null || exposureMode === undefined) return

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
