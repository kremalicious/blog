import { optimize as optimizeSVGNative } from 'svgo'

export const toInnerSvg = (input: string) =>
  optimizeSVGNative(input, {
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeXMLNS',
      'removeEditorsNSData',
      'cleanupAttrs',
      'minifyStyles',
      'convertStyleToAttrs',
      'cleanupIds',
      'removeRasterImages',
      'removeUselessDefs',
      'cleanupNumericValues',
      'cleanupListOfValues',
      'convertColors',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'removeViewBox',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
      'convertShapeToPath',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'convertPathData',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'mergePaths',
      'removeUnusedNS',
      'sortAttrs',
      'removeTitle',
      'removeDesc',
      'removeDimensions',
      'removeStyleElement',
      'removeScriptElement'
    ]
  })
    .data.replace(/^<svg[^>]*>|<\/svg>$/g, '')
    .replace(/ fill="currentColor"/g, '')
    .replace(/ (clip|fill)-rule="evenodd"/g, '')
    .replace(/\/>/g, ' />')
