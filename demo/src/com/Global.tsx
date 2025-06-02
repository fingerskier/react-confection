import React from 'react'
import useGlobal from '@hook/useGlobal'

export default function GlobalDemo() {
  const [value, setValue] = useGlobal('demoGlobal', '')

  return (
    <div>
      <h1>useGlobal</h1>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <p>Value: {value}</p>
    </div>
  )
}
