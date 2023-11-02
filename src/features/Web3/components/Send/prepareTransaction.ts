import type { GetToken } from '@features/Web3/stores/tokens'
import { parseEther, parseUnits } from 'viem'
import {
  prepareSendTransaction,
  prepareWriteContract,
  type SendTransactionArgs,
  type WriteContractPreparedArgs
} from 'wagmi/actions'
import { abiErc20Transfer } from './abiErc20Transfer'

export async function prepareTransaction(
  selectedToken: GetToken | undefined,
  amount: string | undefined,
  to: `0x${string}` | null | undefined,
  chainId: number | undefined
) {
  if (!chainId || !to || !amount || !selectedToken) return

  const isNative = selectedToken?.address === '0x0'

  const config = isNative
    ? ((await prepareSendTransaction({
        chainId,
        to,
        value: parseEther(amount)
      })) as SendTransactionArgs)
    : ((await prepareWriteContract({
        address: selectedToken?.address,
        abi: abiErc20Transfer,
        functionName: 'transfer',
        args: [to, parseUnits(amount, selectedToken?.decimals || 18)]
      })) as WriteContractPreparedArgs)

  return config
}
