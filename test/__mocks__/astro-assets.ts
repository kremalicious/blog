// Minimal runtime mock for `astro:assets` used in unit tests
// Provides a compatible `getImage` that returns the subset used by our code

type GetImageOptions = {
  src: string
  width?: number
  height?: number
}

export async function getImage(options: GetImageOptions) {
  const { src, width = 0, height = 0 } = options

  return {
    src,
    options: { width, height }
  }
}
