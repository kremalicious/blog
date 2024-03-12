import { persistentAtom } from '@nanostores/persistent'
import type { GetToken } from '../hooks/useFetchTokens'

// export const $selectedToken = atom<GetToken | undefined>()

export const $selectedToken = persistentAtom<GetToken | undefined>(
  '@kremalicious/selectedToken',
  undefined,
  {
    encode: JSON.stringify,
    decode: JSON.parse
  }
)
