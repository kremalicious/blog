import { $txHash, $isInitSend } from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import styles from './Success.module.css'

export function Success() {
  const txHash = useStore($txHash)

  return (
    <div className={styles.success}>
      <h5 className={styles.title}>You're amazing!</h5>

      <p>
        Your transaction has been sent. You can check the status on{' '}
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Etherscan
        </a>
        .
      </p>
      <p>
        <code>0xxxx{txHash}</code>
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
