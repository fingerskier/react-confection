import { useState, useEffect, useCallback } from 'react'

type PiPOptions = {
  width?: number
  height?: number
}

type PiPResult = {
  isPiP: boolean
  isSupported: boolean
  pipWindow: Window | null
  enterPiP: (element: HTMLElement) => Promise<void>
  exitPiP: () => Promise<void>
  togglePiP: (element: HTMLElement) => Promise<void>
}

export const usePictureInPicture = (options: PiPOptions = { width: 320, height: 240 }): PiPResult => {
  const [isPiP, setIsPiP] = useState(false)
  const [pipWindow, setPipWindow] = useState<Window | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported('documentPictureInPicture' in window)
  }, [])

  const enterPiP = useCallback(async (element: HTMLElement) => {
    if (!isSupported) return
    try {
      // @ts-ignore
      const newPipWindow: Window = await documentPictureInPicture.requestWindow(options)
      
      // Clone styles from main document
      const styles = Array.from(document.styleSheets)
      styles.forEach(styleSheet => {
        try {
          if (styleSheet.href) {
            const link = newPipWindow.document.createElement('link')
            link.rel = 'stylesheet'
            link.href = styleSheet.href
            newPipWindow.document.head.appendChild(link)
          } else {
            const style = newPipWindow.document.createElement('style')
            Array.from(styleSheet.cssRules).forEach(rule => {
              style.appendChild(newPipWindow.document.createTextNode(rule.cssText))
            })
            newPipWindow.document.head.appendChild(style)
          }
        } catch (e) {
          console.warn('Could not copy stylesheet:', e)
        }
      })

      // Clone the element into PiP window
      const clone = element.cloneNode(true)
      newPipWindow.document.body.appendChild(clone)

      // Update state
      setPipWindow(newPipWindow)
      setIsPiP(true)

      // Handle window close
      newPipWindow.addEventListener('pagehide', () => {
        setIsPiP(false)
        setPipWindow(null)
      })
    } catch (error) {
      console.error('Failed to enter PiP mode:', error)
    }
  }, [isSupported, options])

  const exitPiP = useCallback(async () => {
    if (!isPiP) return
    try {
      // @ts-ignore
      await document.exitPictureInPicture()
      setIsPiP(false)
      setPipWindow(null)
    } catch (error) {
      console.error('Failed to exit PiP mode:', error)
    }
  }, [isPiP])

  const togglePiP = useCallback(async (element: HTMLElement) => {
    if (isPiP) {
      await exitPiP()
    } else {
      await enterPiP(element)
    }
  }, [isPiP, enterPiP, exitPiP])

  return {
    isPiP,
    isSupported,
    pipWindow,
    enterPiP,
    exitPiP,
    togglePiP,
  }
}