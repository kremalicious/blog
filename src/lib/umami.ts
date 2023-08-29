const UMAMI_SCRIPT_URL = process.env.PUBLIC_UMAMI_SCRIPT_URL
const UMAMI_WEBSITE_ID = process.env.PUBLIC_UMAMI_WEBSITE_ID
const isProduction = process.env.NODE_ENV === 'production'

if (isProduction && (!UMAMI_SCRIPT_URL || !UMAMI_WEBSITE_ID)) {
  throw new Error('Missing Umami environment variables')
}

export { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID }
