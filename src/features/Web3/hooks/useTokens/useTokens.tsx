import { useState, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { getTokens } from './getTokens'
import type { GetToken } from './types'

export function useTokens() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const [data, setData] = useState<GetToken[]>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    async function init() {
      if (!address || !chain?.id) return

      setIsLoading(true)

      try {
        const tokens = await getTokens(address, chain.id, signal)
        setData(tokens)
        setIsLoading(false)
      } catch (error: any) {
        setIsError(true)
        setIsLoading(false)
        if ((error as Error).name !== 'AbortError') {
          console.error((error as Error).message)
        }
      }
    }
    init()

    return () => {
      abortController.abort()
      setData(undefined)
      setIsLoading(undefined)
      setIsError(undefined)
    }
  }, [address, chain?.id])

  return { data, isLoading, isError }
}
