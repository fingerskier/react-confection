import React, { useRef } from 'react'
import { usePictureInPicture } from '@hook/usePictureInPicture'

export default function PiPHookDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const { isPiP, togglePiP } = usePictureInPicture()

  return (
    <div>
      <h1>usePictureInPicture</h1>
      <div ref={ref} style={{ width: 100, height: 50, background: '#ccc' }} />
      <button onClick={() => ref.current && togglePiP(ref.current)}>
        {isPiP ? 'Exit' : 'Enter'} PiP
      </button>
    </div>
  )
}
