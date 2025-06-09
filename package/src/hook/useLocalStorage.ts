import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key)
    try {
      const existingValue = item ? JSON.parse(item) : undefined
      if (existingValue !== undefined) {
        return existingValue
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue))
      return defaultValue
    }
  })

  const setValue: Dispatch<SetStateAction<T>> = value => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      setStoredValue(newValue)
      window.localStorage.setItem(key, JSON.stringify(newValue))
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key, newValue } }))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : defaultValue)
        } catch (error) {
          setStoredValue(defaultValue)
        }
      }
    }

    const handleCustomEvent = (event: CustomEvent) => {
      if (event.detail.key === key) {
        setStoredValue(event.detail.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('localStorageUpdate', handleCustomEvent as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageUpdate', handleCustomEvent as EventListener)
    }
  }, [key, defaultValue])

  return [storedValue, setValue]
}

function getItem<T>(key: string): T | null {
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export default useLocalStorage
export { getItem }
