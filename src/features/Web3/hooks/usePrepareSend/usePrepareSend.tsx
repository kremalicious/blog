import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { useNetwork } from 'wagmi'
import type {
  SendTransactionArgs,
  WriteContractPreparedArgs
} from 'wagmi/actions'
import { $amount, $selectedToken } from '@features/Web3/stores'
import { prepare } from './prepare'

export function usePrepareSend({
  to
}: {
  to: `0x${string}` | null | undefined
}) {
  const selectedToken = useStore($selectedToken)
  const amount = useStore($amount)
  const { chain } = useNetwork()

  const [txConfig, setTxConfig] = useState<
    SendTransactionArgs | WriteContractPreparedArgs
  >()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    async function init() {
      if (!selectedToken || !amount || !to || !chain?.id) return

      setError(undefined)
      setIsError(false)
      setIsLoading(true)

      try {
        const config = await prepare(selectedToken, amount, to, chain.id)
        setTxConfig(config)
      } catch (error: unknown) {
        console.error((error as Error).message)

        setIsError(true)

        // only expose useful errors in UI
        if (
          (error as Error).message.includes(
            'this transaction exceeds the balance of the account.'
          )
        ) {
          setError(undefined)
        }
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [selectedToken || amount || to || chain?.id])

  return { data: txConfig, isLoading, isError, error }
}
