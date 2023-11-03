import { useStore } from '@nanostores/react'
import { $txHash } from '@features/Web3/stores'
import { Success } from '../Success'
import { Preview } from '../Preview'

export function Send() {
  const txHash = useStore($txHash)

  return txHash ? <Success /> : <Preview />
}
