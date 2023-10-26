export async function getFiat({
  amount,
  tokenId = 'ethereum'
}: {
  amount: number
  tokenId?: string
}): Promise<{ [key: string]: string }> {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=eur%2Cusd`
  const response = await fetch(url)
  const json = await response.json()

  if (!json) console.error(response.statusText)
  const { usd, eur } = json[tokenId]
  const dollar = (amount * usd).toFixed(2)
  const euro = (amount * eur).toFixed(2)

  return { dollar, euro }
}
