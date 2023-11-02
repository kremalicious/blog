import type { GetToken } from '@features/Web3/stores/tokens'
import { parseEther, parseUnits } from 'viem'
import {
  prepareSendTransaction,
  prepareWriteContract,
  type SendTransactionArgs,
  type WriteContractPreparedArgs
} from 'wagmi/actions'
import { abiErc20Transfer } from '../abiErc20Transfer'

export async function prepareTransaction(
  selectedToken: GetToken | undefined,
  amount: string | undefined,
  to: `0x${string}` | null | undefined,
  chainId: number | undefined
) {
  if (!chainId || !to || !amount || !selectedToken || !selectedToken?.address)
    return

  const isNative = selectedToken.address === '0x0'
  const setupNative = { chainId, to, value: parseEther(amount) }
  const setupErc20 = {
    address: selectedToken.address,
    abi: abiErc20Transfer,
    functionName: 'transfer',
    args: [to, parseUnits(amount, selectedToken.decimals || 18)]
  }

  const config = isNative
    ? ((await prepareSendTransaction(setupNative)) as SendTransactionArgs)
    : ((await prepareWriteContract(setupErc20)) as WriteContractPreparedArgs)

  return config
}
