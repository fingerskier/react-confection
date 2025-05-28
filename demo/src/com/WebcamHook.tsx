import React, { useRef } from 'react'
import useWebcam from '@hook/useWebcam'

export default function WebcamHookDemo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { picBase64, update } = useWebcam(videoRef)

  return (
    <div>
      <h1>useWebcam</h1>
      <video ref={videoRef} autoPlay style={{ width: 160 }} />
      <button onClick={() => update()}>Capture</button>
      {picBase64 && <img src={`data:image/png;base64,${picBase64}`} width={160} />}
    </div>
  )
}
