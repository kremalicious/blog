export const getNetworkName = (netId: number) => {
  let networkName

  switch (netId) {
    case 1:
      networkName = 'Main'
      break
    case 2:
      networkName = 'Morden'
      break
    case 3:
      networkName = 'Ropsten'
      break
    case 4:
      networkName = 'Rinkeby'
      break
    case 42:
      networkName = 'Kovan'
      break
    default:
      networkName = 'Private'
  }

  return networkName
}

export const getFiat = async (amount: number) => {
  const url = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'
  const response = await fetch(url)
  if (!response.ok) console.error(response.statusText)
  const data = await response.json()
  /* eslint-disable @typescript-eslint/camelcase */
  const { price_usd, price_eur } = data[0]
  const dollar = (amount * price_usd).toFixed(2)
  const euro = (amount * price_eur).toFixed(2)
  /* eslint-enable @typescript-eslint/camelcase */

  return { dollar, euro }
}
