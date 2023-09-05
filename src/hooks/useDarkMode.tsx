//
// adapted from
// https://github.com/daveschumaker/react-dark-mode-hook/blob/master/useDarkMode.js
//
import { useCallback, useEffect, useState } from 'react'

const isClient = typeof window === 'object'

function getDarkMode() {
  const theme = document
    .querySelector('html')
    ?.attributes.getNamedItem('data-theme')

  if (isClient && theme?.value === 'dark') {
    return true
  } else {
    return false
  }
}

export type UseDarkMode = {
  isDarkMode: boolean
  themeColor: string | undefined
}

export default function useDarkMode(): UseDarkMode {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getDarkMode())
  const [themeColor, setThemeColor] = useState<string | undefined>()

  //
  // Init
  //
  useEffect(() => {
    setThemeColor(isDarkMode === true ? '#1d2224' : '#e7eef4')
  }, [isDarkMode])

  //
  // Handle theme change events
  //
  const handleChange = useCallback(() => {
    setIsDarkMode(getDarkMode())
  }, [])

  useEffect(() => {
    if (!isClient) return

    const htmlEl = document.querySelector('html')

    try {
      htmlEl?.addEventListener('change', handleChange)
    } catch (addEventListenerError) {
      console.error(addEventListenerError)
    }

    return () => window.removeEventListener('change', handleChange)
  }, [handleChange])

  return { isDarkMode, themeColor }
}
