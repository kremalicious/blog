import { useStore } from '@nanostores/react'
import { $txHash } from '@/features/web3/stores'
import { Preview } from '../Preview'
import { Success } from '../Success'

export function Send() {
  const txHash = useStore($txHash)

  return txHash ? <Success /> : <Preview />
}
