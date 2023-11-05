export type GetToken = {
  address: `0x${string}`
  balance: number | undefined
  chainId: number
  name: string | null
  symbol: string | null
  decimals: number | null
  logo: string | null
  price: {
    usd: number | null
    eur: number | null
  }
}
