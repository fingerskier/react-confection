import React from 'react'
import { PictureInPicture } from './PictureInPicture'

export default function PiPComponentDemo() {
  return (
    <PictureInPicture>
      <video src="/sample.mp4" width={160} height={90} />
    </PictureInPicture>
  )
}
