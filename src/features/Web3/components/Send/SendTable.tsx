import { formatEther } from 'viem'
import { useNetwork } from 'wagmi'
import type {
  SendTransactionArgs,
  WriteContractPreparedArgs
} from 'wagmi/actions'
import styles from './SendTable.module.css'
import { useStore } from '@nanostores/react'
import { $selectedToken } from '@features/Web3/stores'

export function SendTable({
  to,
  ensResolved,
  txConfig,
  isDisabled
}: {
  to: `0x${string}` | null | undefined
  ensResolved: string | null | undefined
  txConfig: SendTransactionArgs | WriteContractPreparedArgs | undefined
  isDisabled: boolean
}) {
  const { chain } = useNetwork()
  const selectedToken = useStore($selectedToken)

  // Derive display values in preview from actual tx config
  // instead from our form stores
  const value =
    (txConfig as SendTransactionArgs)?.value ||
    (txConfig as WriteContractPreparedArgs)?.request?.args?.[1] ||
    '0'
  const displayAmountFromConfig = formatEther(value as bigint)

  return (
    <table className={styles.table} aria-disabled={isDisabled}>
      <tbody>
        <tr>
          <td className={styles.label}>Sending</td>
          <td>
            <span className={styles.amount}>
              {displayAmountFromConfig} {selectedToken?.symbol}
            </span>
          </td>
        </tr>
        <tr>
          <td className={styles.label}>on</td>
          <td>
            <span className={styles.network}>{chain?.name}</span>
          </td>
        </tr>
        {/* <tr>
        <td>From</td>
        <td>
          <code className={styles.from}>{from}</code>
        </td>
      </tr> */}
        <tr>
          <td className={styles.label}>to</td>
          <td title={`${ensResolved} successfully resolved to ${to}`}>
            <code className={styles.to}>{ensResolved}</code>
            <code className={styles.to}>{`→ ${to}`}</code>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
