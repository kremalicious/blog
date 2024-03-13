import { $isInitSend } from '@features/Web3/stores'
import styles from './Success.module.css'
import { useAccount } from 'wagmi'
import { ExplorerLink } from './ExplorerLink'

const title = `You're amazing, thanks!`
const description = `Your transaction is on its way. You can check the status on`

export function Success() {
  const account = useAccount()

  const explorerName = account?.chain?.blockExplorers?.default.name
  const explorerUrl = account?.chain?.blockExplorers?.default.url

  return (
    <div className={styles.success}>
      <h5 className={styles.title}>{title}</h5>

      <p>
        {description}{' '}
        <ExplorerLink url={explorerUrl}>{explorerName}</ExplorerLink>.
      </p>

      <footer className={styles.actions}>
        <button
          onClick={() => $isInitSend.set(false)}
          className="btn btn-primary"
        >
          Close
        </button>
      </footer>
    </div>
  )
}
