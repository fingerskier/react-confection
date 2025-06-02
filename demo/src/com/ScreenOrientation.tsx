<<<<<<< HEAD
import { useScreenOrientation } from 'react-confection'


export default function ScreenOrientation() {
  const { orientation } = useScreenOrientation()

  return (
    <div>
      <h2>Screen Orientation</h2>
      <pre>{JSON.stringify(orientation, null, 2)}</pre>
=======
import React from 'react'
import useScreenOrientation from '@hook/useScreenOrientation'

export default function ScreenOrientationDemo() {
  const { angle, type } = useScreenOrientation()

  return (
    <div>
      <h1>useScreenOrientation</h1>
      <p>angle: {angle}</p>
      <p>type: {type}</p>
>>>>>>> 4e69431607736d687a3387f46c650321984cd60e
    </div>
  )
}
