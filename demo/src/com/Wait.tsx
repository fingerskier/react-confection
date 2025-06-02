<<<<<<< HEAD
import {useState} from 'react'
import { useWait } from 'react-confection'


export default function Wait() {
  const [condition, setCondition] = useState(false)
  const [state, setState] = useState(false)
  
  const wait = useWait(false, 5678)


  const waitForIt = ()=>{
    wait().then(()=>{
      setCondition(false)
      setState('done')
    })
    .catch(()=>{
      setState('timed out')
      setCondition(false)
    })
  }

  const setConditionTrue = ()=>{
    setCondition(true)
  }

  return <>
    <h2>Wait</h2>
    <button onClick={waitForIt}>Start Waiting</button>
    <button onClick={setConditionTrue}>Set Condition</button>
  </>
}
=======
import React, { useState } from 'react'
import useWait from '@hook/useWait'

export default function WaitDemo() {
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)

  if (!done) {
    useWait(ready, 1, 100).then(() => setDone(true)).catch(() => setDone(true))
  }

  return (
    <div>
      <h1>useWait</h1>
      <button onClick={() => setReady(true)}>Finish</button>
      <p>{done ? 'Done' : 'Waiting...'}</p>
    </div>
  )
}
>>>>>>> 4e69431607736d687a3387f46c650321984cd60e
