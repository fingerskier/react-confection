import React,{useEffect,useRef,useState} from 'react'
import useInterval from "./useInterval";

export default function useWebSocket(url, altUrl) {
  /**
   * altUrl = an https url where the value might be retrieved through polling
   */
  const ws = useRef(null)

  const [data, setData] = useState('')
  const [error, setError] = useState(0)
  const [state, setState] = useState({})

  const cancelInterval = useInterval(()=>{
    if (state.type === 'open') {
      cancelInterval()
    } else if (altUrl) {
      fetch(altUrl)
      .then(res=>res.json())
      .then(res=>setData(JSON.parse(res)))
      .catch(err=>{
        cancelInterval()
      })
    }
  }, 250);


  function transmit(data) {
    const msg = JSON.stringify(data)

    try {
      if (ws.current.readyState === 1) {
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

      ws.current.onerror = function(event) {
        console.error('error',event)
        setError(event)
      }

      ws.current.onclose = function(event) {
        state.code = event.code || state.code
        state.eventPhase = event.eventPhase || state.eventPhase
        state.isTrusted = event.isTrusted || state.isTrusted
        state.readyState = event.readyState || state.readyState
        state.reason = event.reason || state.reason
        state.returnValue = event.returnValue || state.returnValue
        state.timeStamp = event.timeStamp || state.timeStamp
        state.type = event.type || state.type
        state.wasClean = event.wasClean || state.wasClean

        setState(state)

        console.error('attempting web-socket reconnect')
        setTimeout(() => {
          ws.current = new WebSocket(url)
        }, 357);
      }

      ws.current.onopen = function(event) {
        state.isTrusted = event.isTrusted || state.isTrusted
        state.readyState = event.readyState || state.readyState
        state.returnValue = event.returnValue || state.returnValue
        state.timeStamp = event.timeStamp || state.timeStamp
        state.type = event.type || state.type

        setState(state)
      }
      ws.current.onmessage = function(event) {
        setData(JSON.parse(event.data))
      }
    } catch(err) {
      console.error(err)
    }

    return () => {
      try {
        ws.current.onclose = null
        ws.current.close()
        cancelInterval()
        
      } catch(err) {
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


  return {data,error,state,transmit}
}