import { useState } from 'react'

declare global {
  interface Window {
    Global: Record<string, any>
  }
}

if (!window.Global) {
  window.Global = {}
}

export default function useGlobal<T>(name: string, _default: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  if (!window.Global[name]) {
    const state = useState<T>(_default)
    window.Global[name] = state
  }
  return window.Global[name]
}