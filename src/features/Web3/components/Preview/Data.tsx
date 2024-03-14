import { useAccount, useChains, useEnsName } from 'wagmi'
import styles from './Data.module.css'
import { useStore } from '@nanostores/react'
import { $amount, $selectedToken } from '@features/Web3/stores'
import { truncateAddress } from '@features/Web3/lib/truncateAddress'

export function Data({
  to,
  ensResolved,
  isDisabled
}: {
  to: `0x${string}` | null | undefined
  ensResolved: string | null | undefined
  isDisabled: boolean
}) {
  const chains = useChains()
  const { address: from } = useAccount()
  const { data: ensFrom } = useEnsName({ address: from, chainId: 1 })

  const selectedToken = useStore($selectedToken)
  const amount = useStore($amount)

  const networkName = chains.filter(
    (chain) => chain.id === selectedToken?.chainId
  )?.[0]?.name

  return (
    <table className={styles.table} aria-disabled={isDisabled}>
      <tbody>
        <tr>
          <td className={styles.label}>You are</td>
          <td>
            {ensFrom ? (
              <abbr title={`${ensFrom} successfully resolved to ${from}`}>
                <span className={styles.from}>{ensFrom}</span>
              </abbr>
            ) : (
              <code className={styles.from}>
                {from ? truncateAddress(from) : ''}
              </code>
            )}
          </td>
        </tr>

        <tr>
          <td className={styles.label}>sending</td>
          <td className={styles.amount}>
            <div className="TokenLogo">
              <img
                src={selectedToken?.logo || ''}
                alt={selectedToken?.name || ''}
              />
            </div>
            <span className={styles.amount}>
              {amount} {selectedToken?.symbol}
            </span>
          </td>
        </tr>

        <tr>
          <td className={styles.label}>on</td>
          <td>
            <div className="TokenLogo">
              <img src={selectedToken?.chainLogo || ''} />
            </div>
            <span className={styles.network}>{networkName}</span>
          </td>
        </tr>

        <tr>
          <td className={styles.label}>to</td>
          <td>
            <abbr title={`${ensResolved} successfully resolved to ${to}`}>
              <span className={styles.to}>{ensResolved}</span>
            </abbr>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
