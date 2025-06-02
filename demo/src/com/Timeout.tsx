import {useState} from 'react'
import { useTimeout } from 'react-confection'


export default function Timeout() {
  const [state, setState] = useState('idle')
  
  const [start, stop] = useTimeout(()=>{
    setState('done')
  }, 5678)

  const begin = () => {
    setState('running')
    start()
  }

  const cancelTimeout = () => {
    stop()
    setState('stopped')
  }

  return (
    <div>
      <h2>Timeout</h2>
      <p>{state}</p>
      <button onClick={begin}>Start</button>
      <button onClick={cancelTimeout}>Stop</button>
    </div>
  )
}