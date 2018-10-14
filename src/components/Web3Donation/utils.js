export const getNetworkName = async netId => {
  let networkName

  switch (netId) {
    case '1':
      networkName = 'Main'
      break
    case '2':
      networkName = 'Morden'
      break
    case '3':
      networkName = 'Ropsten'
      break
    case '4':
      networkName = 'Rinkeby'
      break
    case '42':
      networkName = 'Kovan'
      break
    default:
      networkName = 'Private'
  }

  return networkName
}

export const getFiat = async amount => {
  const url = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw Error(response.statusText)
    }
    const data = await response.json()
    const { price_usd, price_eur } = data[0]
    const dollar = (amount * price_usd).toFixed(2)
    const euro = (amount * price_eur).toFixed(2)

    return { dollar, euro }
  } catch (error) {
    Logger.error(error)
  }
}

export class Logger {
  static dispatch(verb, ...args) {
    // eslint-disable-next-line no-console
    console[verb](...args)
  }

  static log(...args) {
    Logger.dispatch('log', ...args)
  }

  static debug(...args) {
    Logger.dispatch('debug', ...args)
  }

  static error(...args) {
    Logger.dispatch('error', ...args)
  }
}
