import React from 'react'
import { GatsbySSR } from 'gatsby'
import wrapPageElementWithLayout from './src/helpers/wrapPageElement'
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from './src/helpers/umami'

export const wrapPageElement: GatsbySSR['wrapPageElement'] =
  wrapPageElementWithLayout

export const onRenderBody = ({ setPostBodyComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' })

  const isEnabled = process.env.NODE_ENV === 'production'

  if (!isEnabled) {
    return null
  }

  const umamiOptions = {
    src: UMAMI_SCRIPT_URL,
    'data-website-id': UMAMI_WEBSITE_ID
  }

  setPostBodyComponents([
    <script key="umami-script" async defer {...umamiOptions} />
  ])
}
