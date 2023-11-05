export const toReactComponent = (innerSVG: string, title: string) => `
import type { Props } from './Props.d.ts';

export function Icon(props: Props) {
  let {
    size = '24px',
    title,
    width = size,
    height = size
  }: Props = {
    'title': '${title}',
    ...props
  }
  
  const toAttributeSize = (size: number | string) =>
    String(size).replace(/(?<=[0-9])x$/, 'em')
  
  size = toAttributeSize(size)
  width = toAttributeSize(width)
  height = toAttributeSize(height)
  
  const style = {
    width: '1em',
    height: '1em',
    stroke: 'currentcolor',
    strokeWidth: 'var(--border-width)',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
    verticalAlign: 'baseline'
  }

  return <svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...props} style={style as any}>{title ? (<title>{title}</title>) : ''}${innerSVG}</svg>
}
`
