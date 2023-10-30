import { useStore } from '@nanostores/react'
import { useState } from 'react'
import { createTokensStore } from '../stores/tokens'

//
// Wrapper around $tokens store.
//
// Workaround to dynamically create the store based on
// user address and chainId.
//
export function useTokensStore({
  address,
  chainId
}: {
  address: `0x${string}` | undefined
  chainId: number | undefined
}) {
  const store = createTokensStore(address, chainId)

  const [tokensFetchStore] = useState(store)
  const $tokens = useStore(tokensFetchStore)

  //   useEffect(() => {
  //     if (!chainId || !address) return

  //     console.log(tokensFetchStore.key)

  //     const newUrl = `https://web3.kremalicious.com/api/balance?address=${address}&chainId=${chainId}`
  //     tokensFetchStore.setKey(tokensFetchStore.key, newUrl)
  //     console.log(tokensFetchStore.key)
  //   }, [chainId, address])

  return $tokens
}
