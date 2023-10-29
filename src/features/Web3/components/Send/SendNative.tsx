import { parseEther } from 'viem'
import {
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction
} from 'wagmi'
import siteConfig from '@config/blog.config'
import { useEffect } from 'react'

export function SendNative({
  amount,
  setSendFormData
}: {
  amount: string
  setSendFormData: any
}) {
  const { chain } = useNetwork()
  const { config } = usePrepareSendTransaction({
    chainId: chain?.id,
    to: siteConfig.author.ether,
    value: parseEther(amount)
  })
  const {
    data,
    sendTransactionAsync: send,
    isError,
    isSuccess,
    isLoading,
    error
  } = useSendTransaction(config)

  useEffect(() => {
    setSendFormData({
      data,
      send,
      isError,
      isSuccess,
      isLoading,
      error
    })
  }, [data, send, isError, isSuccess, isLoading, error])

  return <></>
}
