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
