import { useState, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { getTokens, type GetToken } from '../api/getTokens'

export function useTokens() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const [data, setData] = useState<GetToken[]>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()

  useEffect(() => {
    async function init() {
      if (!address || !chain) return

      setIsLoading(true)

      try {
        const tokens = await getTokens(address, chain.id)
        setData(tokens)
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
        console.error((error as Error).message)
      }
    }
    init()
  }, [address, chain])

  return { data, isLoading, isError }
}
