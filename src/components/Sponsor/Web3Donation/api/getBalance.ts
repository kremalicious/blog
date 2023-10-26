export async function getBalance(address: `0x${string}` | undefined) {
  const url = `http://localhost:3000/api/balance?address=${address}`
  // const url = `https://web3-api-kremalicious.vercel.app/api/balance?address=${address}`
  const response = await fetch(url)
  const json = await response.json()

  if (!json) console.error(response.statusText)
  return json
}
