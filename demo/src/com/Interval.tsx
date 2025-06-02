<<<<<<< HEAD
import {useState} from 'react'
import { useInterval } from 'react-confection'


export default function Interval() {
  const [count, setCount] = useState(0)

  const cancelInterval = useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return <>
    <h2>Interval</h2>
    <button onClick={cancelInterval}>Stop</button>
    <p>{count}</p>
  </>
}
=======
import React, { useState } from 'react'
import { useInterval } from '@hook/useInterval'

export default function IntervalDemo() {
  const [count, setCount] = useState(0)
  useInterval(() => setCount(c => c + 1), 1000)
  return (
    <div>
      <h1>useInterval</h1>
      <p>Count: {count}</p>
    </div>
  )
}
>>>>>>> 4e69431607736d687a3387f46c650321984cd60e
