import { createFetcherStore } from './fetcher'
import type { GetToken } from './types'

export const createTokensStore = (
  address: `0x${string}` | undefined,
  chainId: number | undefined
) => {
  const url = `https://web3.kremalicious.com/api/balance?address=${address}&chainId=${chainId}`
  const fetcherStore = createFetcherStore<GetToken[]>(url)

  return fetcherStore
}
