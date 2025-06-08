import {useEffect, useState} from 'react'

export interface UseUrlQuery {
  [k: string]: string
}

export interface UseUrlReturn {
  context: string | string[]
  query: UseUrlQuery
  goto: (path: string, newQuery?: UseUrlQuery, replace?: boolean) => void
}

export default function useUrl(): UseUrlReturn {
  const [context, setContext] = useState<string | string[]>('')
  const [query, setQuery] = useState<UseUrlQuery>({})


  const goto = (path: string, Q?: UseUrlQuery, replaceQuery:boolean = false) => {
    let newQuery
    if (replaceQuery) {
      newQuery = Q
    } else {
      newQuery = {
        ...query,
        ...Q,
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


  return { context, query, goto }
}