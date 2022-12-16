import React, {useEffect, useRef, useState} from 'react'

import { useWebcam } from 'react-confection'


export default function({
  flipHorizontal=false,
}) {
  const ref = useRef(null)

  const [style, setStyle] = useState({id:0})

  const webcam = useWebcam(ref)


  useEffect(() => {
    if (style) {
      let newStyle = style

      if (!newStyle?.id) newStyle = {}
      
      
      if (flipHorizontal) {
        newStyle.transform = 'scale(-1, 1)'
      }
      

      setStyle(newStyle)
    }

    return () => {
      setStyle({id:0})
    }
  }, [flipHorizontal])


  return (
    <video
      autoPlay={true}
      ref={ref}
      style={style}
    ></video>
  )
}
