export function normalizeAmount(amount: string): string {
  // Replace comma used as a decimal separator with a period
  amount = amount.replace(',', '.')

  // Remove any non-digit or non-decimal characters
  amount = amount.replace(/[^\d.]/g, '')

  return amount
}
