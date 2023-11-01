import { action, atom } from 'nanostores'
import type { GetToken } from './types'

export const $tokens = atom<GetToken[] | undefined>()

export const $setTokens = action(
  $tokens,
  'setTokens',
  (store, tokens: GetToken[]) => {
    store.set(tokens)
    return store.get()
  }
)
