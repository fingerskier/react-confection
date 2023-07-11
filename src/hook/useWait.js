import {useEffect, useState} from 'react'


export default function useWait(
  condition,
  timeoutSeconds=60,
  intervalMilliseconds=100,
) {
  const [done, setDone] = useState(false)
  const [timeout, setTimeout] = useState(false)

  let ticker
  

  const cancelSafety = useTimeout(() => {
    setTimeout(true)
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


  return new Promise((resolve, reject) => {
    const ticker = setInterval(() => {
      if (done) {
        resolve()
      }

      if (timeout) {
        reject(new Error('Timeout'))
      }
    }, intervalMilliseconds)
  })
}