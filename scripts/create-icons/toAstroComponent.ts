export const toAstroComponent = (innerSVG: string, title: string) => `---
import type { Props } from './Props.d.ts';
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
  width: .85em;
  height: .85em;
  stroke: currentcolor;
  stroke-width: var(--border-width);
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  vertical-align: baseline;
  margin: 0;
  display: inline-block;
}
</style>
<svg width={width} height={height} {...props} class="icon">{title ? (<title>{title}</title>) : ''}${innerSVG}</svg>`
