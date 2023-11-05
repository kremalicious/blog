import {
  sendTransaction as sendNative,
  writeContract,
  type SendTransactionArgs,
  type WriteContractPreparedArgs
} from 'wagmi/actions'
import type { GetToken } from '../useFetchTokens'

export async function send(
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
