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
