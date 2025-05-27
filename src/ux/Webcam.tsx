import React, {useEffect, useRef, useState} from 'react'


export default function({
  flipHorizontal=false,
}) {
  const ref = useRef<HTMLVideoElement>(null)

  const [style, setStyle] = useState<React.CSSProperties>({})


  useEffect(() => {
    let newStyle: React.CSSProperties = {}
    
    if (flipHorizontal) {
      newStyle.transform = 'scale(-1, 1)'
    }
    
    setStyle(newStyle)

    return () => {
      setStyle({})
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
