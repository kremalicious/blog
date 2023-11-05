import { $txHash, $selectedToken } from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import { useState } from 'react'
import type {
  SendTransactionArgs,
  WriteContractPreparedArgs
} from 'wagmi/actions'
import { send } from './send'
import { isUnhelpfulErrorMessage } from './isUnhelpfulErrorMessage'

export function useSend({
  txConfig
}: {
  txConfig: SendTransactionArgs | WriteContractPreparedArgs | undefined
}) {
  const selectedToken = useStore($selectedToken)

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | undefined>()

  async function handleSend() {
    try {
      setIsError(false)
      setError(undefined)
      setIsLoading(true)
      const result = await send(selectedToken, txConfig)
      $txHash.set(result?.hash)
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
