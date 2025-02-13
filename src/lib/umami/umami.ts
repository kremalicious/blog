export function getUmamiConfig(env = import.meta.env): {
  scriptUrl: string
  websiteId: string
} {
  const scriptUrl = env.PUBLIC_UMAMI_SCRIPT_URL
  const websiteId = env.PUBLIC_UMAMI_WEBSITE_ID
  const isProduction = env.PROD

  if (isProduction && (!scriptUrl || !websiteId)) {
    throw new Error('Missing Umami environment variables')
  }

  return { scriptUrl, websiteId }
}
