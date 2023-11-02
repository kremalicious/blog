import type { GetToken } from '@features/Web3/stores/tokens'
import {
  sendTransaction as sendNative,
  writeContract,
  type SendTransactionArgs,
  type WriteContractPreparedArgs
} from 'wagmi/actions'

export async function sendTransaction(
  selectedToken: GetToken | undefined,
  config: SendTransactionArgs | WriteContractPreparedArgs | undefined
) {
  if (!config || !selectedToken) return

  const result =
    selectedToken?.address === '0x0'
      ? await sendNative(config as SendTransactionArgs)
      : await writeContract(config as WriteContractPreparedArgs)

  return result
}
