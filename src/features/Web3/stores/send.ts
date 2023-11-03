import { atom } from 'nanostores'

export const $isInitSend = atom<boolean>(false)
export const $txHash = atom<string | undefined>()
