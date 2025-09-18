import { existsSync } from 'node:fs'

export interface ParsePhotoArgsResult {
  photos: string[]
  photoTitle?: string
}

export function parsePhotoArgs(args: string[]): ParsePhotoArgsResult {
  if (!args || args.length === 0) return { photos: [] }

  const lastArg = args[args.length - 1]
  const lastArgIsFile = !!lastArg && existsSync(lastArg)
  const photoTitle = lastArg && !lastArgIsFile ? lastArg : undefined
  const photos = photoTitle ? args.slice(0, -1) : args
  return { photos, photoTitle }
}
