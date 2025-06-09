import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number = 1000): () => void {
  const savedCallback = useRef<() => void>(null)
  const id = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current()
    }
    if (delay !== null) {
      id.current = setInterval(tick, delay)
      return () => clearInterval(id.current!)
    }
  }, [delay])

  return function () {
    if (id.current) clearInterval(id.current)
  }
}