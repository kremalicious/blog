import { parseUnits } from 'viem'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import siteConfig from '@config/blog.config'
import { abiErc20Transfer } from './abiErc20Transfer'
import { useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { $selectedToken } from '@features/Web3/stores/tokens/selectedToken'

export function SendErc20({
  amount,
  setSendFormData
}: {
  amount: string
  setSendFormData: any
}) {
  const selectedToken = useStore($selectedToken)

  const { config } = usePrepareContractWrite({
    address: selectedToken?.address,
    abi: abiErc20Transfer,
    functionName: 'transfer',
    args: [
      siteConfig.author.ether,
      parseUnits(amount, selectedToken?.decimals || 18)
    ]
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
