import type { GetToken } from './types'

export async function getTokens(
  address: `0x${string}`,
  chainId: number,
  signal?: AbortSignal
): Promise<GetToken[]> {
  if (!address || !chainId) return []

  // const url = `http://localhost:3000/api/balance?address=${address}&chainId=${chainId}`
  const url = `https://web3.kremalicious.com/api/balance?address=${address}&chainId=${chainId}`
  const response = await fetch(url, { signal })
  const json: GetToken[] = await response.json()

  if (!json) console.error(response.statusText)
  return json
}
