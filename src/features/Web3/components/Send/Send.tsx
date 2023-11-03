import { useStore } from '@nanostores/react'
import { useEnsAddress, useEnsName } from 'wagmi'
import { $isInitSend, $txHash } from '@features/Web3/stores'
import siteConfig from '@config/blog.config'
import styles from './Send.module.css'
import { SendTable } from './SendTable'
import { Loader } from '@components/Loader'
import { usePrepareSend } from '@features/Web3/hooks/usePrepareSend'
import { useSend } from '@features/Web3/hooks/useSend'

export function Send({ amount }: { amount: string }) {
  const txHash = useStore($txHash)

  // Always resolve to address from ENS name and vice versa
  // so nobody has to trust my config values.
  const { ens } = siteConfig.author.ether
  const { data: to } = useEnsAddress({ name: ens, chainId: 1 })
  const { data: ensResolved } = useEnsName({
    address: to as `0x${string}` | undefined,
    chainId: 1
  })

  const {
    data: txConfig,
    error: prepareError,
    isError: isPrepareError
  } = usePrepareSend({ amount, to })
  const { handleSend, isLoading, error } = useSend({ txConfig })

  // Cancel send flow if chain changes as this can mess with token selection
  // useEffect(() => {
  //   if (!chain?.id || $isInitSend.get() === false) return
  //   $isInitSend.set(false)
  // }, [chain?.id])

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

        <div className={styles.alert}>{error || prepareError}</div>

        <footer className={styles.actions}>
          <button
            onClick={(e) => handleSend(e)}
            className="btn btn-primary"
            disabled={isLoading || !txConfig || isPrepareError}
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
