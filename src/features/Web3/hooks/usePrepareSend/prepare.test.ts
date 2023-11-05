import { test, expect, vi } from 'vitest'
import { prepare } from './prepare'
import * as wagmiActionsMock from '../../../../../test/__mocks__/wagmi/actions'

test('prepare with undefined params', async () => {
  try {
    await prepare(undefined, undefined, undefined, undefined)
    expect(true).toBe(false)
  } catch (e) {
    expect(true).toBe(true)
  }
})

test('prepare with isNative true uses correct method', async () => {
  const selectedToken = {
    address: '0x0',
    decimals: 18
    // Add other required properties here
  }

  const amount = '1'
  const to = '0xabcdef1234567890'
  const chainId = 1

  const spy = vi.spyOn(wagmiActionsMock, 'prepareSendTransaction')
  await prepare(selectedToken as any, amount, to, chainId)
  expect(spy).toHaveBeenCalledOnce()
})

test('prepare with isNative false uses correct method', async () => {
  const selectedToken = {
    address: '0xabcdef1234567890',
    decimals: 18
  }

  const amount = '1'
  const to = '0xabcdef1234567890'
  const chainId = 1

  const spy = vi.spyOn(wagmiActionsMock, 'prepareWriteContract')
  await prepare(selectedToken as any, amount, to, chainId)
  expect(spy).toHaveBeenCalledOnce()
})
