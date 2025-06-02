import {useEffect, useState} from 'react'
import useTimeout from '@hook/useTimeout'


export default function useWait(
  condition: boolean,
  timeoutSeconds=60,
  intervalMilliseconds=100,
): Promise<void> {
  const [done, setDone] = useState(false)
  const [timeout, setTimeoutState] = useState(false)

  let ticker: NodeJS.Timeout
  

  const [startSafety,cancelSafety] = useTimeout(() => {
    setTimeoutState(true)
  }, timeoutSeconds * 1000)


  useEffect(() => {
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


  const waiter = new Promise<void>((resolve, reject) => {
    startSafety()
    ticker = setInterval(() => {
      if (done) {
        resolve(undefined)
      }

      if (timeout) {
        clearInterval(ticker)
        reject(new Error('Timeout'))
      }
    }, intervalMilliseconds)
  })


  return waiter
}