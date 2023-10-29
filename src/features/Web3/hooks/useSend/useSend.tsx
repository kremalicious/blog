import { getTransactionMessage } from '@features/Web3/components/Alert/Alert'
import type { SendFormData } from '@features/Web3/components/Form/types'
import { useEffect, useState } from 'react'

export function useSend(sendFormData: SendFormData | undefined) {
  const { isLoading, isSuccess, isError, error } = sendFormData || {}
  const [message, setMessage] = useState<{ status: string; text: string }>()

  useEffect(() => {
    if (!isError || !error) return

    setMessage(
      error.message.includes('User rejected the request.')
        ? undefined
        : {
            status: 'error',
            text: error?.message as string
          }
    )
  }, [isError])

  useEffect(() => {
    if (!isLoading) return

    setMessage({
      status: 'loading',
      text: getTransactionMessage().waitingConfirmation
    })
  }, [isLoading])

  useEffect(() => {
    if (!isSuccess) return

    setMessage({
      status: 'success',
      text: getTransactionMessage().success
    })
  }, [isSuccess])

  return { message }
}
