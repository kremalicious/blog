import { $txHash } from '@features/Web3/stores'
import { useStore } from '@nanostores/react'
import { Preview } from '../Preview'
import { Success } from '../Success'

export function Send() {
  const txHash = useStore($txHash)

  return txHash ? <Success /> : <Preview />
}
