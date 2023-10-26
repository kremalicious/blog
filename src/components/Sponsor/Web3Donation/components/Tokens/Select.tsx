import * as Select from '@radix-ui/react-select'
import './Select.css'
import { SelectItem } from './SelectItem'
import { ChevronDown, ChevronsDown, ChevronsUp } from '@images/components/react'
import { useEffect, useState } from 'react'
import { getBalance } from '../../api/getBalance'
import { useAccount, useNetwork } from 'wagmi'

export function TokenSelect() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const [tokens, setTokens] = useState()

  useEffect(() => {
    if (!address || !chain) return

    async function getTokens() {
      try {
        const response = await getBalance(address)
        const tokens = response.filter(
          (token: any) => parseInt(token.chainId) === chain?.id
        )
        setTokens(tokens)
      } catch (error) {
        console.error((error as Error).message)
      }
    }
    getTokens()
  }, [address, chain])

  return (
    <Select.Root disabled={!address}>
      <Select.Trigger className="SelectTrigger" aria-label="Token">
        <Select.Value placeholder="…" />
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal style={{ zIndex: 10 }}>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronsUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">
                In Your Wallet
              </Select.Label>

              {tokens?.map((token: any) => (
                <SelectItem
                  key={token.token_address}
                  value={token.token_address}
                  icon={token.logo}
                >
                  {token.name}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronsDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
