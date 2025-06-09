import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export interface UseUrlQuery {
  [k: string]: string
}

export interface UseUrlReturn {
  context: string | string[]
  query: UseUrlQuery
  goto: (path?: string | null, newQuery?: UseUrlQuery | null, replace?: boolean) => void
}

const UrlContext = createContext<UseUrlReturn | undefined>(undefined)

interface UrlProviderProps {
  children: ReactNode
}

export function UrlProvider({ children }: UrlProviderProps) {
  const [context, setContext] = useState<string | string[]>('')
  const [query, setQuery] = useState<UseUrlQuery>({})

  const goto = (
    path?: string | null,
    Q?: UseUrlQuery | null,
    replaceQuery: boolean = false,
  ) => {
    let newQuery
    if (replaceQuery) {
      newQuery = Q ?? null
    } else {
      newQuery = {
        ...query,
        ...(Q ?? {}),
      }
    }

    const queryString = newQuery ? new URLSearchParams(newQuery).toString() : ''
    let newUrl = queryString ? `?${queryString}` : ''

    if (path) {
      newUrl += `#${path}`
    } else {
      newUrl += `#${context}`
    }

    window.history.pushState({}, '', newUrl)
    handleHashChange()
  }

  const handleHashChange = () => {
    const hash = window.location.hash.slice(1)
    const queryString = window.location.search

    const newContext = hash.includes('/') ? hash.split('/') : hash
    const newQuery = new URLSearchParams(queryString)

    const trimmedContext = Array.isArray(newContext)
      ? newContext.map(item => item.trim()).join('/')
      : newContext.trim()
    const queryObj = Object.fromEntries(newQuery.entries())

    setContext(trimmedContext)
    setQuery(queryObj)
  }

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const value: UseUrlReturn = { context, query, goto }

  return (
    <UrlContext.Provider value={value}>
      {children}
    </UrlContext.Provider>
  )
}

export function useUrl(): UseUrlReturn {
  const context = useContext(UrlContext)
  if (context === undefined) {
    throw new Error('useUrl must be used within a UrlProvider')
  }
  return context
} 