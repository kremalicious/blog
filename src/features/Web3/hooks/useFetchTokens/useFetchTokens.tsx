import { useEffect, useState } from 'react'
import useSWR from 'swr'
import type { GetToken } from '@features/Web3/stores/tokens'
import { useNetwork, useAccount } from 'wagmi'
import { $setTokens } from '@features/Web3/stores/tokens'
import { $setSelectedToken } from '@features/Web3/stores/selectedToken'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const apiUrl = import.meta.env.PUBLIC_WEB3_API_URL

//
// Wrapper for fetching user tokens with swr.
//
export function useFetchTokens() {
  const { chain } = useNetwork()
  const { address } = useAccount()

  const [url, setUrl] = useState<string | undefined>()

  const fetchResults = useSWR<GetToken[] | undefined>(url, fetcher)
  const { data } = fetchResults

  // Set url only after we have all data loaded on client,
  // preventing initial fetch.
  useEffect(() => {
    if (!address || !chain?.id) return

    const url = `${apiUrl}/balance?address=${address}&chainId=${chain?.id}`
    setUrl(url)
    console.log('useFetchTokens', url)
  }, [address, chain?.id])

  // Sync with $tokens store
  useEffect(() => {
    if (!data) return
    $setTokens(data)
  }, [data])

  // Set default token data to first item,
  // which most of time is native token
  useEffect(() => {
    if (!data?.[0]?.chainId) return
    $setSelectedToken(data?.[0])
  }, [data?.[0]?.chainId])

  return fetchResults
}
