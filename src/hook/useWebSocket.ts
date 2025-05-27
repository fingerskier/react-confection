import { useEffect, useRef, useState } from 'react'
import useInterval from '@hook/useInterval'

interface WebSocketState {
  [key: string]: any
  type?: string
  code?: number
  eventPhase?: number
  isTrusted?: boolean
  readyState?: number
  reason?: string
  returnValue?: any
  timeStamp?: number
  wasClean?: boolean
}

interface WebSocketResult {
  data: any
  error: any
  state: WebSocketState
  transmit: (data: any) => void
}

export default function useWebSocket(url: string, altUrl?: string): WebSocketResult {
  /**
   * altUrl = an https url where the value might be retrieved through polling
   */
  const ws = useRef<WebSocket | null>(null)

  const [data, setData] = useState<any>('')
  const [error, setError] = useState<any>(0)
  const [state, setState] = useState<WebSocketState>({})

  const cancelInterval = useInterval(() => {
    if (state.type === 'open') {
      cancelInterval()
    } else if (altUrl) {
      fetch(altUrl)
        .then(res => res.json())
        .then(res => setData(JSON.parse(res)))
        .catch(() => {
          cancelInterval()
        })
    }
  }, 250)

  function transmit(data: any) {
    const msg = JSON.stringify(data)
    try {
      if (ws.current && ws.current.readyState === 1) {
        try {
          ws.current.send(msg)
        } catch (error) {
          console.error(error)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    try {
      ws.current = new WebSocket(url)
      ws.current.onerror = function (event) {
        console.error('error', event)
        setError(event)
      }
      ws.current.onclose = function (event) {
        const newState = { ...state }
        newState.code = event.code || state.code
        newState.eventPhase = event.eventPhase || state.eventPhase
        newState.isTrusted = event.isTrusted || state.isTrusted
        newState.readyState = ws.current?.readyState ?? state.readyState
        newState.reason = event.reason || state.reason
        newState.returnValue = event.returnValue || state.returnValue
        newState.timeStamp = event.timeStamp || state.timeStamp
        newState.type = event.type || state.type
        newState.wasClean = event.wasClean || state.wasClean
        setState(newState)
        console.error('attempting web-socket reconnect')
        setTimeout(() => {
          ws.current = new WebSocket(url)
        }, 357)
      }
      ws.current.onopen = function (event) {
        const newState = { ...state }
        newState.isTrusted = event.isTrusted || state.isTrusted
        newState.readyState = ws.current?.readyState ?? state.readyState
        newState.returnValue = event.returnValue || state.returnValue
        newState.timeStamp = event.timeStamp || state.timeStamp
        newState.type = event.type || state.type
        setState(newState)
      }
      ws.current.onmessage = function (event) {
        setData(JSON.parse(event.data))
      }
    } catch (err) {
      console.error(err)
    }
    return () => {
      try {
        if (ws.current) {
          ws.current.onclose = null
          ws.current.close()
        }
        cancelInterval()
      } catch (err) {
        console.error(err)
      }
    }
  }, [])

  // useEffect(() => {
  //   console.log(url, state)
  //   try {
  //     if (state.type === 'open') {
  //       cancelInterval()
  //       console.log('http polling cancelled', altUrl, state)
  //     }
  //   } catch (error) {
  //     cancelInterval()
  //     console.log('problem with state effect', url, state)
  //   }
  // }, [state])

  return { data, error, state, transmit }
}