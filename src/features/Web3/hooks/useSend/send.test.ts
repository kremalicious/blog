import { test, expect, vi } from 'vitest'
import { send } from './send'
import * as wagmiActionsMock from '../../../../../test/__mocks__/wagmi/actions'

test('with undefined params', async () => {
  const result = await send(
    undefined as any,
    undefined as any,
    undefined as any,
    undefined as any,
    undefined as any
  )
  expect(result).toBeUndefined()
})

test('with isNative true uses correct method', async () => {
  const selectedToken = {
    address: '0x0',
    decimals: 18
  } as any

  const spy = vi.spyOn(wagmiActionsMock, 'sendTransaction')
  await send({} as any, selectedToken, '1', '0xabcdef1234567890', 1)
  expect(spy).toHaveBeenCalledOnce()
})

test('with isNative false uses correct method', async () => {
  const selectedToken = {
    address: '0xabcdef1234567890',
    decimals: 18
  } as any

  const spy = vi.spyOn(wagmiActionsMock, 'writeContract')
  await send({} as any, selectedToken, '1', '0xabcdef1234567890', 1)
  expect(spy).toHaveBeenCalledOnce()
})
