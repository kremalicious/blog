import siteConfig from '@config/blog.config'
import { $amount, $selectedToken, $txHash } from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import { useState } from 'react'
import { useAccount, useConfig, useEnsAddress, useSwitchChain } from 'wagmi'
import { isUnhelpfulErrorMessage } from './isUnhelpfulErrorMessage'
import { send } from './send'

export function useSend() {
  const selectedToken = useStore($selectedToken)
  const amount = useStore($amount)
  const config = useConfig()
  const { chainId } = useAccount()
  const { ens } = siteConfig.author.ether
  const { data: to } = useEnsAddress({ name: ens, chainId: 1 })
  const { switchChain } = useSwitchChain()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | undefined>()

  async function handleSend() {
    if (!selectedToken || !amount || !to) return

    // switch chains first
    if (chainId !== selectedToken.chainId) {
      switchChain({ chainId: selectedToken.chainId })
    }

    try {
      setIsError(false)
      setError(undefined)
      setIsLoading(true)
      const hash = await send(
        config,
        selectedToken,
        amount,
        to,
        selectedToken.chainId
      )
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
