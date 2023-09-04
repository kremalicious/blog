import { optimize as optimizeSVGNative } from 'svgo'

export const toAstroComponent = (innerSVG: string, title: string) => `---
import type { Props } from './Props.ts';
export type { Props };

let {
	size = '24px',
	title,
	width = size,
	height = size,
	...props
}: Props = {
	'fill': 'none',
	'title': '${title}',
	'viewBox': '0 0 24 24',
	...Astro.props
}

const toAttributeSize = (size: number | string) =>
  String(size).replace(/(?<=[0-9])x$/, 'em')

size = toAttributeSize(size)
width = toAttributeSize(width)
height = toAttributeSize(height)
---
<style is:global>
.icon {
  width: 1em;
  height: 1em;
  stroke: currentcolor;
  stroke-width: var(--stroke-width);
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  vertical-align: baseline;
}
</style>
<svg {width} {height} {...props} class="icon">{title ? (<title>{title}</title>) : ''}${innerSVG}</svg>`

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
