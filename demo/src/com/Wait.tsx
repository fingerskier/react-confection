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
