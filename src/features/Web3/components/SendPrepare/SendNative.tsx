import { parseEther } from 'viem'
import {
  useEnsAddress,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction
} from 'wagmi'
import siteConfig from '@config/blog.config'
import { useEffect } from 'react'

export function SendPrepareNative({
  amount,
  setSendFormData
}: {
  amount: string
  setSendFormData: any
}) {
  const { chain } = useNetwork()
  const { data: to } = useEnsAddress({
    name: siteConfig.author.ether.ens,
    chainId: 1
  })
  const { config } = usePrepareSendTransaction({
    chainId: chain?.id,
    to: to || undefined,
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
