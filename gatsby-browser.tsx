import { GatsbyBrowser } from 'gatsby'
import './src/global/global.css'
import './src/global/imports.css'

import wrapPageElementWithLayout from './src/helpers/wrapPageElement'
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] =
  wrapPageElementWithLayout
