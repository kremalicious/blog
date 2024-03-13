import { $txHash, $selectedToken, $amount } from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import { useState } from 'react'
import { send } from './send'
import { isUnhelpfulErrorMessage } from './isUnhelpfulErrorMessage'
import { useAccount, useConfig } from 'wagmi'

export function useSend() {
  const selectedToken = useStore($selectedToken)
  const amount = useStore($amount)
  const config = useConfig()
  const { address, chainId } = useAccount()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | undefined>()

  async function handleSend() {
    try {
      setIsError(false)
      setError(undefined)
      setIsLoading(true)
      const hash = await send(config, selectedToken, amount, address, chainId)
      if (hash) $txHash.set(hash)
    } catch (error: unknown) {
      const errorMessage = (error as Error).message
      console.error(errorMessage)

      // only expose useful errors in UI
      if (isUnhelpfulErrorMessage(errorMessage)) {
        setError(undefined)
      } else {
        setError((error as Error).message)
      }
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSend, isLoading, error, isError }
}
