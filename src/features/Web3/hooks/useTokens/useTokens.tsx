import { useEffect, useState } from 'react'
import useSWR from 'swr'
import type { GetToken } from './types'
import { useNetwork, useAccount } from 'wagmi'
import { fetcher } from '@stores/fetcher'

//
// Wrapper for fetching user tokens with swr,
// and simple store for selected token.
//
export function useTokens() {
  const { chain } = useNetwork()
  const { address } = useAccount()

  const [url, setUrl] = useState<string | undefined>(undefined)
  const [selectedToken, setSelectedToken] = useState<GetToken | undefined>()

  const fetchResults = useSWR<GetToken[] | undefined>(url, fetcher)
  const { data: tokens } = fetchResults

  // Set url only after we have all data loaded on client,
  // preventing initial fetch.
  useEffect(() => {
    if (!address || !chain?.id) return

    const url = `https://web3.kremalicious.com/api/balance?address=${address}&chainId=${chain?.id}`
    setUrl(url)
  }, [address, chain?.id])

  // Set default token data to first item,
  // which most of time is native token
  useEffect(() => {
    if (!tokens?.[0]?.address) return

    setSelectedToken(tokens?.[0])
  }, [tokens?.[0]?.address])

  return { ...fetchResults, selectedToken, setSelectedToken }
}
