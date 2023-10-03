import slugifyLib from 'slugify'

export const slugify = (text: string) =>
  slugifyLib(text, { lower: true, remove: /[*+~.()'"!:@]/g })

export const slugifyAll = (arr: string[]) => arr.map((str) => slugify(str))
