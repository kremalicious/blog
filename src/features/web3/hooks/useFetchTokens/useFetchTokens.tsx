import { useEffect, useState } from 'react'
import useSwr, { type SWRResponse } from 'swr'
import { useAccount, useChains } from 'wagmi'
import type { GetToken } from './types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const apiUrl = import.meta.env.PUBLIC_WEB3_API_URL

//
// Wrapper for fetching user tokens with swr.
//
export function useFetchTokens(): SWRResponse<GetToken[] | undefined, Error> {
  const { address } = useAccount()
  const chains = useChains()
  const [url, setUrl] = useState<string | undefined>()
  const fetchResults = useSwr<GetToken[] | undefined>(url, fetcher)

  // Set url only after we have all data loaded on client,
  // preventing initial fetch.
  useEffect(() => {
    if (!address || !chains) {
      setUrl(undefined)
      return
    }

    const chainIds = chains.map((chain) => chain.id).join(',')
    const url = `${apiUrl}/balance?address=${address}&chainIds=${chainIds}`
    setUrl(url)
  }, [address, chains])

  return fetchResults
}
