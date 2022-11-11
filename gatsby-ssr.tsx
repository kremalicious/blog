import { GatsbySSR } from 'gatsby'
import wrapPageElementWithLayout from './src/helpers/wrapPageElement'

export const wrapPageElement: GatsbySSR['wrapPageElement'] =
  wrapPageElementWithLayout
