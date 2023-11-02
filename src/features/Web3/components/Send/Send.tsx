import { useStore } from '@nanostores/react'
import { $selectedToken } from '@features/Web3/stores/selectedToken'
import { useNetwork, useEnsAddress } from 'wagmi'
import siteConfig from '@config/blog.config'
import { useState, type FormEvent, useEffect } from 'react'
import { prepareTransaction } from './prepareTransaction'
import { sendTransaction } from './sendTransaction'
import type {
  SendTransactionArgs,
  WriteContractPreparedArgs
} from 'wagmi/actions'
import { formatEther } from 'viem'

export function Send({
  amount,
  setInitSend
}: {
  amount: string
  setInitSend: (initSend: boolean) => void
}) {
  const { chain } = useNetwork()
  const selectedToken = useStore($selectedToken)
  const { data: to } = useEnsAddress({
    name: siteConfig.author.ether.ens,
    chainId: 1
  })

  const [txConfig, setTxConfig] = useState<
    SendTransactionArgs | WriteContractPreparedArgs
  >()
  const [txHash, setTxHash] = useState<string>()

  useEffect(() => {
    async function init() {
      if (!selectedToken || !amount || !to || !chain?.id) return

      const config = await prepareTransaction(
        selectedToken,
        amount,
        to,
        chain.id
      )
      setTxConfig(config)
    }
    init()
  }, [selectedToken || amount || to || chain?.id])

  async function handleSend(event: FormEvent<HTMLButtonElement>) {
    event?.preventDefault()
    const result = await sendTransaction(selectedToken, txConfig)
    setTxHash(result?.hash)
  }

  const value =
    (txConfig as SendTransactionArgs)?.value ||
    (txConfig as WriteContractPreparedArgs)?.request?.args[1] ||
    '0'
  const displayAmountFromConfig = formatEther(value)
  console.log(txHash)

  return (
    <>
      <div>
        <p>You are about to send</p>
        <p>
          {displayAmountFromConfig} {selectedToken?.symbol} to <code>{to}</code>{' '}
          on {chain?.name}
        </p>
        <button onClick={(e) => handleSend(e)}>Confirm</button>
        <button onClick={() => setInitSend(false)}>Cancel</button>
      </div>
    </>
  )
}
