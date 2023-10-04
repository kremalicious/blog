export function getUmamiConfig(env = import.meta.env): {
  UMAMI_SCRIPT_URL: string
  UMAMI_WEBSITE_ID: string
} {
  const UMAMI_SCRIPT_URL = env.PUBLIC_UMAMI_SCRIPT_URL
  const UMAMI_WEBSITE_ID = env.PUBLIC_UMAMI_WEBSITE_ID
  const isProduction = env.PROD

  if (isProduction && (!UMAMI_SCRIPT_URL || !UMAMI_WEBSITE_ID)) {
    throw new Error('Missing Umami environment variables')
  }

  return { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID }
}
