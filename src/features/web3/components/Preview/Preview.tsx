import { useEnsAddress, useEnsName } from 'wagmi'
import { Loader } from '@/components/Loader'
import { metadata } from '@/config'
import { useSend } from '@/features/web3/hooks/useSend'
import { $isInitSend } from '@/features/web3/stores'
import { Data } from './Data'
import styles from './Preview.module.css'

export function Preview() {
  // Always resolve to address from ENS name and vice versa
  // so nobody has to trust my config values.
  const { ens } = metadata.author.ether
  const { data: to } = useEnsAddress({ name: ens, chainId: 1 })
  const { data: ensResolved } = useEnsName({
    address: to as `0x${string}`,
    chainId: 1
  })

  const { handleSend, isLoading, error } = useSend()

  return (
    <>
      <Data to={to} ensResolved={ensResolved} isDisabled={isLoading} />

      {error ? <div className={styles.alert}>{error}</div> : null}

      <footer className={styles.actions}>
        <button
          type="button"
          onClick={async (e) => {
            e?.preventDefault()
            await handleSend()
          }}
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'Make it rain'}
        </button>
        <button
          type="button"
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
