import { useStore } from '@nanostores/react'
import { useState } from 'react'
import { useConfig, useConnection, useEnsAddress, useSwitchChain } from 'wagmi'
import { metadata } from '@/config'
import { $amount, $selectedToken, $txHash } from '@/features/web3/stores'
import { isUnhelpfulErrorMessage } from './isUnhelpfulErrorMessage'
import { send } from './send'

export function useSend() {
  const selectedToken = useStore($selectedToken)
  const amount = useStore($amount)
  const config = useConfig()
  const { chainId } = useConnection()
  const { ens } = metadata.author.ether
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
