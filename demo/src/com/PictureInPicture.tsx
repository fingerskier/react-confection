import { useRef } from 'react'
import { usePictureInPicture } from 'react-confection'


export default function PictureInPicture() {
  const ref = useRef<HTMLVideoElement>(null)
  const { togglePiP } = usePictureInPicture()

  return (
    <div>
      <h2>PictureInPicture</h2>
      <video ref={ref} src="/sample.mp4" width={160} height={90} />
      <button onClick={() => ref.current && togglePiP(ref.current)}>Toggle PiP</button>
    </div>
  )
}