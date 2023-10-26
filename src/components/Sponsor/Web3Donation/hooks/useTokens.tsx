import { useState, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { getBalance } from '../api/getBalance'

export function useTokens() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()

  useEffect(() => {
    if (!address || !chain) return

    async function getTokens() {
      setIsLoading(true)

      try {
        const response = await getBalance(address)
        const tokens = response.filter(
          (token: any) => parseInt(token.chainId) === chain?.id
        )
        setData(tokens)
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
        console.error((error as Error).message)
      }
    }
    getTokens()
  }, [address, chain])

  return { data, isLoading, isError }
}
