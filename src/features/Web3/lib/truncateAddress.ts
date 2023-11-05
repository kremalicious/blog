export function truncateAddress(
  address: `0x${string}`,
  startLength = 6,
  endLength = 4
) {
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`
}
