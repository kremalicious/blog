import { atom } from 'nanostores'
import { normalizeAmount } from '../lib/normalizeAmount'

export const $isInitSend = atom<boolean>(false)
export const $amount = atom<string>('')
export const $txHash = atom<string | undefined>()

export const $setAmount = (amount: string) => {
  const normalizedAmount = normalizeAmount(amount)
  return $amount.set(normalizedAmount)
}
