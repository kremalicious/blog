import { Loader } from '@components/Loader'
import { usePrepareSend } from '@features/Web3/hooks/usePrepareSend'
import { useSend } from '@features/Web3/hooks/useSend'
import { $isInitSend } from '@features/Web3/stores'
import { useEnsAddress, useEnsName } from 'wagmi'
import { Data } from './Data'
import siteConfig from '@config/blog.config'
import styles from './Preview.module.css'

export function Preview() {
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
  } = usePrepareSend({ to })
  const { handleSend, isLoading, error } = useSend({ txConfig })

  // TODO: Cancel flow if chain changes in preview as this can mess with token selection
  // useEffect(() => {
  //   if (!chain?.id || $isInitSend.get() === false) return
  //   $isInitSend.set(false)
  // }, [chain?.id])

  return (
    <>
      <Data
        to={to}
        ensResolved={ensResolved}
        txConfig={txConfig}
        isDisabled={isLoading}
      />

      {console.log(txConfig)}

      {error || prepareError ? (
        <div className={styles.alert}>{error || prepareError}</div>
      ) : null}

      <footer className={styles.actions}>
        <button
          onClick={async (e) => {
            e?.preventDefault()
            await handleSend()
          }}
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
    </>
  )
}
