import { useState, type FormEvent, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { useNetwork, useEnsAddress, useEnsName } from 'wagmi'
import type {
  SendTransactionArgs,
  WriteContractPreparedArgs
} from 'wagmi/actions'
import { $selectedToken, $isInitSend } from '@features/Web3/stores'
import siteConfig from '@config/blog.config'
import { prepareTransaction, sendTransaction } from './actions'
import styles from './Send.module.css'
import { SendTable } from './SendTable'
import { Loader } from '@components/Loader'

export function Send({ amount }: { amount: string }) {
  const { ens } = siteConfig.author.ether
  const { chain } = useNetwork()
  const selectedToken = useStore($selectedToken)

  // Always resolve to address from ENS name and vice versa
  // so nobody has to trust my config values.
  const { data: to } = useEnsAddress({ name: ens, chainId: 1 })
  const { data: ensResolved } = useEnsName({
    address: to as `0x${string}` | undefined,
    chainId: 1
  })

  const [txConfig, setTxConfig] = useState<
    SendTransactionArgs | WriteContractPreparedArgs
  >()
  const [txHash, setTxHash] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

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

  // Cancel send flow if chain changes as this can mess with token selection
  // useEffect(() => {
  //   if (!chain?.id || $isInitSend.get() === false) return
  //   $isInitSend.set(false)
  // }, [chain?.id])

  async function handleSend(event: FormEvent<HTMLButtonElement>) {
    event?.preventDefault()
    try {
      setIsLoading(true)
      const result = await sendTransaction(selectedToken, txConfig)
      setTxHash(result?.hash)
      setIsLoading(false)
    } catch (error: unknown) {
      console.error((error as Error).message)
      setIsLoading(false)
    }
  }

  console.log(txHash)

  return (
    <>
      <div className={styles.send}>
        {/* <h5 className={styles.title}>You are sending</h5> */}

        <SendTable
          to={to}
          ensResolved={ensResolved}
          txConfig={txConfig}
          isDisabled={isLoading}
        />

        <footer className={styles.actions}>
          <button
            onClick={(e) => handleSend(e)}
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Make it rain'}
          </button>
          <button
            onClick={() => $isInitSend.set(false)}
            className="link"
            disabled={isLoading}
          >
            Cancel
          </button>
        </footer>
      </div>
    </>
  )
}
