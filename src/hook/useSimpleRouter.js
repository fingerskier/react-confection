import {useEffect, useState} from 'react'


export default function useSimpleRouter() {
  const [context, setContext] = useState('')
  const [state, setState] = useState({})
  
  
  const handleHashChange = () => {
    const V = window.location.hash.substring(1).split('/')
    
    setContext(V)
    
    
    const Q = window.location.search.substring(1)
    
    if (Q) {
      const newQuery = Q.split('&').reduce((acc, pair) => {
        const [key, value] = pair.split('=')
        acc[key] = value
        return acc
      }, {})
      
      setState(newQuery)
    }
  }
  
  
  const pushState = (key,value) => {
    const url = new URL(window.location)
    url.searchParams.set(key, value)
    window.history.pushState({}, '', url)
  }
  
  
  const replaceState = (key,value) => {
    const url = new URL(window.location)
    url.searchParams.set(key, value)
    window.history.replaceState({}, '', url)
  }
  
  
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange)
    
    handleHashChange()
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  
  
  return {
    context,
    state,
    pushState,
    replaceState,
  }
}
