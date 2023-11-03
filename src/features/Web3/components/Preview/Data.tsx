import { formatEther, formatUnits } from 'viem'
import { useAccount, useEnsName, useNetwork } from 'wagmi'
import type {
  SendTransactionArgs,
  WriteContractPreparedArgs
} from 'wagmi/actions'
import styles from './Data.module.css'
import { useStore } from '@nanostores/react'
import { $selectedToken } from '@features/Web3/stores'

export function Data({
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
  const { address: from } = useAccount()
  const { data: ensFrom } = useEnsName({ address: from, chainId: 1 })
  const selectedToken = useStore($selectedToken)

  // Derive display values in preview from actual tx config
  // instead from our form stores
  const value =
    (txConfig as SendTransactionArgs)?.value ||
    (txConfig as WriteContractPreparedArgs)?.request?.args?.[1] ||
    '0'
  const displayAmountFromConfig =
    selectedToken?.decimals === 18
      ? formatEther(value as bigint)
      : selectedToken?.decimals
      ? formatUnits(value as bigint, selectedToken.decimals)
      : '0'

  return (
    <table className={styles.table} aria-disabled={isDisabled}>
      <tbody>
        <tr>
          <td className={styles.label}>You are</td>
          {ensFrom ? (
            <td title={`${ensFrom} successfully resolved to ${from}`}>
              <code className={styles.from}>{ensFrom}</code>
              <code className={styles.from}>{`→ ${from}`}</code>
            </td>
          ) : (
            <td>
              <code className={styles.from}>{from}</code>
            </td>
          )}
        </tr>

        <tr>
          <td className={styles.label}>sending</td>
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
