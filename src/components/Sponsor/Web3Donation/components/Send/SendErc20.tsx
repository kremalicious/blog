import { parseEther } from 'viem'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import siteConfig from '@config/blog.config'
import { abiErc20Transfer } from './abiErc20Transfer'
import { useEffect } from 'react'

export function SendErc20({
  amount,
  tokenAddress,
  setSendFormData
}: {
  amount: string
  tokenAddress: `0x${string}` | undefined
  setSendFormData: any
}) {
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: abiErc20Transfer,
    functionName: 'transfer',
    args: [siteConfig.author.ether, parseEther(amount)]
  })

  const {
    data,
    writeAsync: send,
    isError,
    isSuccess,
    isLoading,
    error
  } = useContractWrite(config)

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