import { action, atom } from 'nanostores'
import { normalizeAmount } from '../lib/normalizeAmount'

export const $isInitSend = atom<boolean>(false)
export const $amount = atom<string>('')
export const $txHash = atom<string | undefined>()

export const $setAmount = action($amount, 'setAmount', (store, amount) => {
  const normalizedAmount = normalizeAmount(amount)
  store.set(normalizedAmount)
  return store.get()
})
