export type GetToken = {
  address: `0x${string}`
  balance: number | undefined
  chainId: number
  name: string | null
  symbol: string | null
  decimals: number | null
  logo: string | null
  price: {
    usd: number | null
    eur: number | null
  }
}

export async function getTokens(
  address: `0x${string}`,
  chainId: number
): Promise<GetToken[]> {
  if (!address || !chainId) return []

  // const url = `http://localhost:3000/api/balance?address=${address}&chainId=${chainId}`
  const url = `https://web3-api-kremalicious.vercel.app/api/balance?address=${address}&chainId=${chainId}`
  const response = await fetch(url)
  const json: GetToken[] = await response.json()

  if (!json) console.error(response.statusText)
  return json
}
