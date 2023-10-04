import slugifyLib from 'slugify'

export function slugify(text: string): string {
  return slugifyLib(text, { lower: true, remove: /[*+~.()'"!:@]/g })
}

export function slugifyAll(arr: string[]): string[] {
  return arr.map((str) => slugify(str))
}
