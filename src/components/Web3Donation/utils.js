import Web3 from 'web3'

export const getWeb3 = async () => {
  let web3

  // Modern dapp browsers...
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)

    try {
      // Request account access
      await window.ethereum.enable()

      return web3
    } catch (error) {
      // User denied account access...
      Logger.error(error)
      return error
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)

    return web3
  }
  // Non-dapp browsers...
  else {
    return
  }
}

export const getAccounts = async web3 => {
  const ethAccounts = await web3.eth.getAccounts()

  return ethAccounts
}

export const getNetwork = async web3 => {
  const netId = await web3.eth.net.getId()
  const networkName = getNetworkName(netId)

  return { netId, networkName }
}

export const getNetworkName = netId => {
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

export const getFiat = async amount => {
  const url = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'

  try {
    const response = await fetch(url)
    if (!response.ok) Logger.error(response.statusText)
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
