export function getUmamiConfig() {
  const UMAMI_SCRIPT_URL = import.meta.env.PUBLIC_UMAMI_SCRIPT_URL
  const UMAMI_WEBSITE_ID = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID
  const isProduction = import.meta.env.NODE_ENV === 'production'

  if (isProduction && (!UMAMI_SCRIPT_URL || !UMAMI_WEBSITE_ID)) {
    throw new Error('Missing Umami environment variables')
  }

  return { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID }
}
