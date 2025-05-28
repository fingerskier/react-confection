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
