import { action, map } from 'nanostores'
import type { GetToken } from '../hooks/useTokens'

export const $selectedToken = map<GetToken>()

export const $setSelectedToken = action(
  $selectedToken,
  'setSelectedToken',
  (store, token: GetToken) => {
    store.set(token)
    return store.get()
  }
)
