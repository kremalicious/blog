import { atom } from 'nanostores'

export type Theme = 'light' | 'dark'
export type ThemeColor = '#e7eef4' | '#1d2224'

export const $theme = atom<Theme>('light')
export const $themeColor = atom<ThemeColor>('#e7eef4')
