<<<<<<< HEAD
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
=======
import React, { useState } from 'react'
import { useTimeout } from '@hook/useTimeout'

export default function TimeoutDemo() {
  const [fired, setFired] = useState(false)
  useTimeout(() => setFired(true), 1000)
  return (
    <div>
      <h1>useTimeout</h1>
      <p>{fired ? 'Triggered' : 'Waiting...'}</p>
    </div>
  )
}
>>>>>>> 4e69431607736d687a3387f46c650321984cd60e
