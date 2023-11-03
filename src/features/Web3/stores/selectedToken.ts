import { atom } from 'nanostores'
// import { persistentAtom } from '@nanostores/persistent'
import type { GetToken } from './tokens'

export const $selectedToken = atom<GetToken | undefined>()

// export const $selectedToken = persistentAtom<GetToken | undefined>(
//   '@kremalicious/selectedToken',
//   undefined,
//   {
//     encode: JSON.stringify,
//     decode: JSON.parse
//   }
// )

// export const $selectedToken.set = action(
//   $selectedToken,
//   'setSelectedToken',
//   (store, token: GetToken) => {
//     store.set(token)
//     return store.get()
//   }
// )
