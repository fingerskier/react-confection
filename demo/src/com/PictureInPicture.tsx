import React from 'react'
import { usePictureInPicture } from 'react-confection'


export default function PictureInPicture() {
  const { isPiP, isSupported, pipWindow, enterPiP, exitPiP, togglePiP } = usePictureInPicture()

  return (
    <div>
      <h2>PictureInPicture</h2>
      <button onClick={() => togglePiP()}>Toggle PiP</button>
    </div>
  )
}