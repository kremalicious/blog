import { parseEther, parseUnits } from 'viem'
import type { UseConfigReturnType } from 'wagmi'
import { sendTransaction, writeContract } from 'wagmi/actions'
import type { GetToken } from '../useFetchTokens'
import { abiErc20Transfer } from './abiErc20Transfer'

export async function send(
  config: UseConfigReturnType,
  selectedToken: GetToken | undefined,
  amount: string | undefined,
  to: `0x${string}` | null | undefined,
  chainId: number | undefined
) {
  if (!selectedToken?.decimals || !amount || !to) return

  const isNative = selectedToken.address.startsWith('0x0')
  const requestNative = { chainId, to, value: parseEther(amount) }
  const requestErc20 = {
    chainId,
    address: selectedToken.address,
    abi: abiErc20Transfer,
    functionName: 'transfer',
    args: [to, parseUnits(amount, selectedToken.decimals)]
  }

  const result = isNative
    ? await sendTransaction(config, requestNative)
    : await writeContract(config, requestErc20)

  return result
}
