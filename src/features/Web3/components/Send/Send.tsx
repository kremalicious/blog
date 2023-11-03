import { useStore } from '@nanostores/react'
import { $txHash } from '@features/Web3/stores'
import styles from './Send.module.css'
import { Success } from '../Success'
import { Preview } from '../Preview'

export function Send() {
  const txHash = useStore($txHash)

  return <div className={styles.send}>{txHash ? <Success /> : <Preview />}</div>
}
