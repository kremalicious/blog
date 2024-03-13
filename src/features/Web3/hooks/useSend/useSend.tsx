import { $txHash, $selectedToken, $amount } from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import { useState } from 'react'
import { send } from './send'
import { isUnhelpfulErrorMessage } from './isUnhelpfulErrorMessage'
import { useAccount, useConfig, useEnsAddress } from 'wagmi'
import siteConfig from '@config/blog.config'

export function useSend() {
  const selectedToken = useStore($selectedToken)
  const amount = useStore($amount)
  const config = useConfig()
  const { chainId } = useAccount()
  const { ens } = siteConfig.author.ether
  const { data: to } = useEnsAddress({ name: ens, chainId: 1 })

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | undefined>()

  async function handleSend() {
    try {
      setIsError(false)
      setError(undefined)
      setIsLoading(true)
      const hash = await send(config, selectedToken, amount, to, chainId)
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
