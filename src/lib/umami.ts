export function getUmamiConfig(env = import.meta.env) {
  const UMAMI_SCRIPT_URL = env.PUBLIC_UMAMI_SCRIPT_URL
  const UMAMI_WEBSITE_ID = env.PUBLIC_UMAMI_WEBSITE_ID
  const isProduction = env.NODE_ENV === 'production'

  if (isProduction && (!UMAMI_SCRIPT_URL || !UMAMI_WEBSITE_ID)) {
    throw new Error('Missing Umami environment variables')
  }

  return { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID }
}
