import React from 'react'
import { useLocalStorage } from '@/hook/useLocalStorage'

export default function LocalStorageDemo() {
  const [value, setValue] = useLocalStorage('demo-storage', '')
  return (
    <div>
      <h1>useLocalStorage</h1>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <p>Value: {value}</p>
    </div>
  )
}
