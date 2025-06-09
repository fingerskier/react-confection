import {useEffect, useState} from 'react'
import useTimeout from './useTimeout'


export default function useWait(
  condition: boolean,
  timeoutSeconds=60,
): {done: boolean, timeout: boolean} {
  const [done, setDone] = useState(false)
  const [timeout, setTimeoutState] = useState(false)

  let ticker: NodeJS.Timeout = 0 as unknown as NodeJS.Timeout
  

  const [startSafety,cancelSafety] = useTimeout(() => {
    setTimeoutState(true)
  }, timeoutSeconds * 1000)


  useEffect(() => {
    startSafety()
    return () => {
      cancelSafety()
      clearInterval(ticker)
    }
  }, [])
  

  useEffect(() => {
    if (condition) {
      setDone(true)
    }
  }, [condition])


  return {done, timeout}
}