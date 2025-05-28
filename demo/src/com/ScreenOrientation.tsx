import React from 'react'
import useScreenOrientation from '@hook/useScreenOrientation'

export default function ScreenOrientationDemo() {
  const { angle, type } = useScreenOrientation()

  return (
    <div>
      <h1>useScreenOrientation</h1>
      <p>angle: {angle}</p>
      <p>type: {type}</p>
    </div>
  )
}
