import { action } from 'nanostores'
import { persistentAtom } from '@nanostores/persistent'
import type { GetToken } from '../hooks/useTokens'

export const $selectedToken = persistentAtom<GetToken | undefined>(
  '@kremalicious/selectedToken',
  undefined,
  {
    encode: JSON.stringify,
    decode: JSON.parse
  }
)

export const $setSelectedToken = action(
  $selectedToken,
  'setSelectedToken',
  (store, token: GetToken) => {
    store.set(token)
    return store.get()
  }
)
