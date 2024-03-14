export type GetToken = {
  address: `0x${string}`
  balance: number | undefined
  chainId: number
  chainLogo: string | undefined
  name: string | undefined
  symbol: string | undefined
  decimals: number | undefined
  logo: string | undefined
  price: {
    usd: number | undefined
    eur: number | undefined
  }
}
