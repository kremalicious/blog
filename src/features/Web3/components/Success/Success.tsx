import { $txHash, $isInitSend } from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import styles from './Success.module.css'
import { useNetwork } from 'wagmi'

export function Success() {
  const { chain } = useNetwork()
  const txHash = useStore($txHash)

  const explorerName = chain?.blockExplorers?.default.name
  const explorerLink = `${chain?.blockExplorers?.default.url}/tx/${txHash}`

  return (
    <div className={styles.success}>
      <h5 className={styles.title}>You're amazing, thanks!</h5>

      <p>
        Your transaction is on its way. You can check the status on{' '}
        <a href={explorerLink} target="_blank" rel="noopener noreferrer">
          {explorerName}
        </a>
        .
      </p>
      <p>
        <a href={explorerLink} target="_blank" rel="noopener noreferrer">
          <code>{txHash}</code>
        </a>
      </p>

      <footer className={styles.actions}>
        <button
          onClick={() => $isInitSend.set(false)}
          className="btn btn-primary"
        >
          Reset
        </button>
      </footer>
    </div>
  )
}
