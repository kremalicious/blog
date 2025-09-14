import { useStore } from '@nanostores/react'
import { $txHash } from '@/features/web3/stores'

export function ExplorerLink({
  url,
  children
}: {
  url: string | undefined
  children: React.ReactNode
}) {
  const txHash = useStore($txHash)
  const explorerLink = `${url}/tx/${txHash}`

  return (
    <a href={explorerLink} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
