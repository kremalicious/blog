import { parseEther, parseUnits } from 'viem'
import {
  prepareSendTransaction,
  prepareWriteContract,
  type SendTransactionArgs,
  type WriteContractPreparedArgs
} from 'wagmi/actions'
import { abiErc20Transfer } from './abiErc20Transfer'
import type { GetToken } from '../useFetchTokens'

export async function prepare(
  selectedToken: GetToken | undefined,
  amount: string | undefined,
  to: `0x${string}` | null | undefined,
  chainId: number | undefined
) {
  if (
    !chainId ||
    !to ||
    !amount ||
    !selectedToken ||
    !selectedToken?.address ||
    !selectedToken?.decimals
  )
    return

  const isNative = selectedToken.address === '0x0'
  const requestNative = { chainId, to, value: parseEther(amount) }
  const requestErc20 = {
    chainId,
    address: selectedToken.address,
    abi: abiErc20Transfer,
    functionName: 'transfer',
    args: [to, parseUnits(amount, selectedToken.decimals)]
  }

  const config = isNative
    ? ((await prepareSendTransaction(requestNative)) as SendTransactionArgs)
    : ((await prepareWriteContract(requestErc20)) as WriteContractPreparedArgs)

  return config
}
